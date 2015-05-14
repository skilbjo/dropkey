## Project

Production: [dropkey.io](http://dropkey.io)

Staging: [dropkey-staging](https://dropkey-staging.herokuapp.com/)

Development: [localhost](https://localhost:8080/)

Source code: [git](https://github.com/skilbjo/dropkey)


## Install

Postgres

(ARM architecture, libpq, etc)

env files

self signed certs

## Project Overview 

A `node.js` web app that handles the business logic of the Dropkey product. 

## Technical Details

The stack:

| Scope       | Area                      | Technology                                                                |
|-------------|---------------------------|---------------------------------------------------------------------------|
| Front End   | `js` Library              | [jQuery](http://jquery.com/)                                              |
| Front End   | `jquery.payment` Library  | [jQuery.payment](https://github.com/stripe/jquery.payment)                |
| Server Side | Templating Language       | [jade](http://jade-lang.com/reference/)                                   |
| Server Side | MVC Framework             | [express.js](http://expressjs.com/api.html)                               |
| Server Side | Language                  | [node.js](http://nodejs.org/api)                                          |
| Server Side | Object-Relational Mapping | [sequelize.js](https://github.com/sequelize/sequelize/wiki/API-Reference) |
| Server Side | Database                  | [postgres](http://www.postgresql.org/docs/)                               |
| Integration | Payments                  | [stripe](https://stripe.com/docs/api/node)                                |
| Integration | Email                     | [email.js](https://github.com/eleith/emailjs)                             |
| Integration | Deployment                | [heroku](https://devcenter.heroku.com/categories/nodejs)                  |


## Installation

	$ git clone https://github.com/skilbjo/dropkey.git

	$ npm install

	$ postgres -D /usr/local/var/postgres --fork

	$ vim lib/dev.env

Add in super secret configuration variables (API keys, database URL)

Here are the config vars you'll need...
````
DATABASE_URL= [[ path to HTTP endpoint where heroku PSQL database lives ]]
FILE_PATH= [[ path to HTTP endpoint where file lives ]]
GMAIL_PASS=
GMAIL_USER=
HEROKU_POSTGRESQL_ORANGE_URL=
DROPBOX_KEY=
DROPBOX_SECRET=
DROPBOX_CALLBACK="http://localhost/auth/facebook/callback"
NODE_ENV=production

````


## Let's begin!

Run the server locally with `gulp` and `node-foreman` (loads config vars from `lib\env\dev.env`)

	$ gulp

Or, deploy

	$ git push heroku master

	$ heroku ps

	$ heroku logs -t

	$ heroku open

