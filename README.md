# Basic node API

[![Maintainability](https://api.codeclimate.com/v1/badges/65e3a684cd28554d0383/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/labs-api-starter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/65e3a684cd28554d0383/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/labs-api-starter/test_coverage)

> **Disclaimer:** This application is currently in Beta mode and is not ready for
> production. Please use at your own risk as things will change almost daily.

The following examples can be found in this project template.

- CRUD routes for a single resource
- A Knex model providing CRUD methods for DB operations
- Some route tests with mocks on the database calls
- Okta authentication verification middleware
- eslint setup and prettier formating.
- Jest coverage setup
- Inline Swagger docs with a live route at `/api-docs`
- Github workflow config setup to run linting, tests and upload coverage to code climate
- docker-compose file for spinning up postgresql db. (Win10 Home requires WSL)

## Requirements

All [Labs Engineering Standards](https://labs.lambdaschool.com/topics/node-js/) must be followed.

## API doc

All routes can be viewed in the [/api-docs route](https://labs-api-starter.herokuapp.com/api-docs/)
of your deploy (or locally).

- https://localhost:8005/api-docs

Swagger docs are created using open api v3 notations. The docs are found inline
on the router files in `api/**/*Router.js` and use the yaml notation format.
The root of the docs is in `config/jsdoc.js` using the json format.

The following libraries have been used to build and serve the swagger docs live.

- [express-ui](https://github.com/scottie1984/swagger-ui-express)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)

## Getting Started

### Enviornment Variables

- `PORT` - API port (optional, but helpful with FE running as well)
- `DS_API_URL` - URL to a data science api. (eg. https://ds-bw-test.herokuapp.com/)
- `DS_API_TOKEN` - authorization header token for data science api (eg. SUPERSECRET)
- `DATABASE_URL` - connection string for postgres database
- `OKTA_URL_ISSUER` - The complete issuer URL for verifying okta access tokens. `https://example.okta.com/oauth2/default`
- `OKTA_CLIENT_ID` - the okta client ID.

See .env.sample for example values

### Setup postgres

There are 3 options to get postgresql installed locally [Choose one]:

1. Use docker. [Install](https://docs.docker.com/get-docker/) for your platform
    - run: `docker-compose up -d` to start up the postgresql database and pgadmin.
    - Open a browser to [pgadmin](http://localhost:5050/) and you should see the Dev server already defined.
    - If you need to start over you will need to delete the folder `$ rm -rf ./data/pg` as this is where all of the server data is stored.
      - if the database `api-dev` was not created then start over.
2. Download and install postgresql directly from the [main site](https://www.postgresql.org/download/)
    - make note of the port, username and password you use to setup the database.
    - Connect your client to the server manually using the values previously mentioned
    - You will need to create a database manually using a client.
    - Make sure to update the DATABASE_URL connection string with the values for username/password, databasename and server port (if not 5432).
3. Setup a free account at [ElephantSQL](https://www.elephantsql.com/plans.html)
    - Sign up for a free `Tiney Turtle` plan
    - copy the URL to the DATABASE_URL .env variable
    - make sure to add `?ssl=true` to the end of this url

### Setup the application

- For Labs projects, clone the repo. Otherwise you can create a new repo using this as a template.

  - **note** please [be sure to set your remote](https://help.github.jp/enterprise/2.11/user/articles/changing-a-remote-s-url/) for this repo to point to your Labs Team Repository.
  - Alternatively you can clone this repo then remove the git folder to initialize a new repo

    ```bash
    > git clone --depth=1 --branch=main git@github.com:Lambda-School-Labs/labs-api-starter.git NEW-REPO-NAME
    > rm -rf ./NEW-REPO-NAME/.git
    ```

- run: `npm install` to download all dependencies.
- run: `cp .env.sample .env` and update the enviornment variables to match your local setup.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.

> Make sure to update the details of the app name, description and version in
> the `package.json` and `config/jsdoc.js` files.

## Contributing

### ESLint and prettier

[ESLint](https://eslint.org/) and [prettier](https://prettier.io/) are already
configured with Lambda Labs standards and ready to go. These must be ran from
the CLI prior to commiting code in the following ways:

- `npm run lint` to view all purposed fixes.
- `npm run lint:fix` to apply fixes to eslint issues.
- `npm run format` to apply the standards defined by eslint/prettier config.

Alternatively you can install plugins for your editor of choice.
