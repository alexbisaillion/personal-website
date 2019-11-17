# My Personal Website
---

### Background

* This is the home of my personal website! You can reach it on the web at alexbisaillion.me.
* Important things to know:
  * The client side of this app was bootstrapped initially with [create-react-app](https://github.com/facebook/create-react-app) then modified to suit the needs of this project.
  * I use an express server to handle all authenticated calls to the [Spotify API](https://developer.spotify.com/).
  * The website is hosted on a Heroku hobby dyno.
  * Cloudflare is being used to redirect all HTTP traffic to HTTPS.
* Useful links:
  * [GitHub Student Developer Pack](https://education.github.com/pack)
  * [Create React App with an Express Backend](https://daveceddia.com/create-react-app-express-backend/)
  * [Deploy React and Express to Heroku](https://daveceddia.com/deploy-react-express-app-heroku/)
  * [Using Cloudflare with Heroku](http://hackingui.com/front-end/setup-https-on-heroku-cloudflare-namecheap/)

### Install/Launch

* A `package.json` file is provided in both the main server directory and the client directory, so `npm install` will simply install all required dependencies.
* Both the server and client can be launched from their respective `package.json` files using `npm start`.
* You can reach the webpage locally at http://localhost:3000/.

### Dependencies

* [express](https://www.npmjs.com/package/express)
* [moment](https://www.npmjs.com/package/moment)
* [node-vibrant](https://www.npmjs.com/package/node-vibrant)
* [spotify-web-api-node](https://www.npmjs.com/package/spotify-web-api-node)  
