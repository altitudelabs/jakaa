const bcryptService = require('../service/bcrypt');
const authenticate = require('../middleware/authenticate');
/**
 * loginUser() checks whether email and password combination exists and matches with db
 *
 * @param {String} email
 * @param {String} password
 *
 * @return {Promise} resolve with logged in user without password
 */

const loginUser = (email, password) => {
  return PG.User.findOne({ where: { email: email.toLowerCase() } })
    .then((user) => {
      if (user === null) {
        throw new HttpError(404, 'The user does not exist');
      }
      if (!user.isVerified) {
        throw new HttpError(403, 'You need to verify your email first.');
      }
      return bcryptService.comparePassword(password, user.password)
        .then(() => {
          return Promise.resolve(user);
        })
        .catch((e) => {
          if (e.status === 401) { throw new HttpError(401, 'password is wrong!'); }
          throw e;
        });
    });
};

exports.index = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    throw new HttpError(422, 'Email is required');
  }
  if (!password) {
    throw new HttpError(422, 'Password is required');
  }
  loginUser(email, password)
  .then((user) => {
      // Set session
    req.session.token = authenticate.genTokenFromId(user._id);
    req.session.save();
    delete user.password;
    user.save();
    return res.status(200).send(
      Object.assign(
        user.toObject(),
        {
          token: authenticate.genMobileTokenFromId(user._id),
        }
      )
    );
  })
    .catch(err => next(err));
};

exports.register = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  // validation
  if (!email || !email.trim()) {
    throw new HttpError(422, 'Email is required');
  }

  if (!password) {
    throw new HttpError(422, 'Password is required');
  }
  if (confirmPassword !== password) {
    throw new HttpError(422, 'Password does not match');
  }

  if (password.length < 7) {
    throw new HttpError(422, 'Password has to be at least 7 characters long');
  }

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!firstName || !firstName.trim()) {
    throw new HttpError(422, 'First name is required');
  }
  if (!lastName || !lastName.trim()) {
    throw new HttpError(422, 'Last name is required');
  }

  PG.User
    .findOne({ email: email.toLowerCase(), isDeleted: false })
    .then((user) => {
      if (user === null) { // unique user
        return bcryptService.encryptPassword(password);
      }

      throw new HttpError(409, 'Email already exists!');
    })
    .then((hash) => {
      // encrypt password
      return PG.User.create({
        email,
        name: {
          first: firstName,
          last: lastName,
        },
        password: hash,
        role: 'user',
      });
    })
    .then((user) => {
      // create tokens
      // const verifyEmailToken = jwt.sign({ email: user.email }, config.secrets.verifyEmailToken); // not using email token verification
      // const removeEmailToken = jwt.sign({ email: user.email }, config.secrets.removeEmailToken);

      // send email with tokens (only when outside of test environment to avoid clogging inbox)
      // if (config.env !== 'test' && config.env !== 'development') {
      // sendVerifyEmail(
      //   user.email,
      //   req.protocol,
      //   req.headers.host,
      //   removeEmailToken
      // );
      // }
      // saved user
      req.session.token = authenticate.genTokenFromId(user._id);
      return res.status(200).send(Object.assign({}, user.dataValues, {
        token: authenticate.genMobileTokenFromId(user._id),
      }));
    })
    .catch(err => next(err));
};
