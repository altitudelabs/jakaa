# React App Template

_This is a sample template for nodeJS application_

**Default features include:**
- Module bundling via [webpack](https://webpack.github.io/docs/) with auto reload
- sass
- Babel for client side
- Serverside view templates via [pug](https://pugjs.org/api/getting-started.html)
- mongoDB with mongoose || postgres with sequelize
- deployment to gh-pages

**Upcoming features**
- spritesheet generation

### Folder Structure
please refer to the wiki for high level diagram of file structure (upcoming)

### Downloading the template
```
mkdir <Project Name>
cd <Project Name>
npm install altitudelabs/template-react
mv ./node_modules/react-boilerplate/* ./
rm -r ./node_modules
```

**if you want to add to your github repo**
1. add remote to the your repo
```
cd <Project Name>
git init
git remote add origin <Repo URL>
```
2. update the name of the project on package.json

3. initial commit
```
git add --all
git commit -m " add AL react boilerplate "
git push origin master
```


### Running the project
**pre requisites**
- nodeJS
- npm
- database (mongo or postgres)

**run the project**

*development*
```
cd <Project>
npm install
npm run build  #terminal 1 // will be running webpack dev server
npm start      #terminal 2
```
development server should be running on localhost:3000.

*production*
1. change node_env to production
  ```
  vim server/config/environment/default-env.js
  ```
  add ```process.env['NODE_ENV'] = 'production';``` and save

2. build
  ```
  cd <Project>
  npm install
  npm run build-prod
  ```

3. run
  ```
  npm start
  ```


### Deploy to gh-pages
```
npm run deploy-gh
```
this will 1. build client in dev environment, and push client/dist folder to origin gh-pages branch
