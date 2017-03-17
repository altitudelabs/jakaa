# Jakaa

- Module bundling via [webpack](https://webpack.github.io/docs/) with auto reload
- sass
- Babel for client side
- Serverside view templates via [pug](https://pugjs.org/api/getting-started.html)
- mongoDB with mongoose || postgres with sequelize
- deployment to gh-pages

### Running the project
**pre requisites**
- nodeJS (6.3.0)
- npm (3.10.3)
- Postgres

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
