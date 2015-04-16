## Project

Production: [xltest.io](https://xltest.io)
Staging: [xltest-staging](https://xltest-staging.herokuapp.com/)
Development: [localhost](https://localhost:5000/)
Source code: [git](https://github.com/skilbjo/xltest)


## Project Overview 

A `node.js` web app that sells my Excel test I give candidates when interviewing to be on my team. Often I noticed that candidates would list "mastery of MS Excel" on their resumes, but when tested, they have at best an intermediate skillset. The Excel test would provide a check to anyone who wants to list expert level Excel skills.

## Technical Details

The project here is to test my `node.js` skills.

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

	$ git clone https://github.com/skilbjo/xltest.git

	$ npm install

	$ postgres -D /usr/local/var/postgres --fork

	$ vim .env

Add in super secret configuration variables (API keys, database URL)

Here are the config vars you'll need...
````
DATABASE_URL= [[ path to HTTP endpoint where heroku PSQL database lives ]]
FILE_PATH= [[ path to HTTP endpoint where file lives ]]
GMAIL_PASS=
GMAIL_USER=
HEROKU_POSTGRESQL_ORANGE_URL=
STRIPE_LIVE_PUBLIC=
STRIPE_LIVE_SECRET=
STRIPE_TEST_PUBLIC=
STRIPE_TEST_SECRET=
NODE_ENV=production

````

Add the Excel test in `/public/assets/xltest.xlsx`


## Let's begin!

Run the server locally with `node-foreman` (loads config vars from `.env`)

	nf start -x 8080 -e lib/env/dev.env

Or, deploy

	$ git push heroku master

	$ heroku ps

	$ heroku logs -t

	$ heroku open

