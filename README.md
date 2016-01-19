# Kids Bank  

App to support REST API for Kids Bank backend.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone https://github.com/abhagupta/kidsBank.git # or clone your own fork
$ cd kidsBank
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

### Current API

```
GET /summary/:username/:kidsname - To retrieve total rewards for  a kid under a username (parent)
 
GET  /transactiontype/:username - Retrieve all the transaction type that a username (parent) has created.

GET /transactions/:username/:kidsname - Retrieve transactions for a kid under a username

POST /transaction/:user/:kidsname/:transactionType - Add a transaction for a user for a kid of type

POST /:username/:pin - Add a new username with a pin

POST /:username/kids/:kidsname - Add a kid for a username

POST transactiontype/post/:username  - Add a transaction type 
```