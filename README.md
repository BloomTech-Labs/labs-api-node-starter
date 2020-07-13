# Basic node API

> **Disclaimer:** This application is currently in Alpha and is not ready for
> production. Please use at your own risk as things will change almost daily.

The following examples can be found in this project template.

- CRUD routes for a single resource
- A Knex model providing CRUD methods for DB operations
- Some route tests with mocks on the database calls
- eslint setup and prettier formating.
- Jest coverage setup
- Inline Swagger docs with a live route at `/api-docs`
- Github workflow config setup to run linting, tests and upload coverage to code climate
- docker-compose file for spinning up postgresql db. (Win10 Home requires WSL)

## Requirements

All [Labs Engineering Standards](https://labs.lambdaschool.com/topics/node-js/) must be followed.

## API doc

All routes can be viewed in the [/api-docs route](https://labs-api-starter.herokuapp.com/api-docs/)

Swagger docs are created using open api v3 notations. The docs are found inline on the route files in `api/routes` and use the yaml notation format. The root of the docs is in `config/jsdoc.js` using the json format.

The following libraries have been used to serve the swagger docs live.

- [express-ui](https://github.com/scottie1984/swagger-ui-express)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)

## Getting Started

### Enviornment Variables

`PORT` - API port
`DATABASE_URL` - connection string for postgres database
`OKTA_URL_ISSUER` - The complete issuer URL for verifying okta access tokens. `https://example.okta.com/oauth2/default`
`OKTA_CLIENT_ID` - the okta client ID.

See .env.sample for example values

### Setup postgres

- Install [docker](https://docs.docker.com/get-docker/) for your platform
  - Alternatively, for the older Windows 10 Home edition you have the following options
    1. Install Postgress directly on your computer from [Download page](https://www.postgresql.org/download/)
    2. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and Docker. This has many more steps involved up front but will get you a docker setup that can be used in the future
- run: `docker-compose up` to start up the postgresql database.

### Setup the application

- Fork and clone the repo to install it as your own remote.

  - **note** please [be sure to set your remote](https://help.github.jp/enterprise/2.11/user/articles/changing-a-remote-s-url/) for this repo to point to your Labs Team Repository.
  - Alternatively you can clone this repo then remove the git folder to initialize a new repo

    ```bash
    > git clone --depth=1 --branch=master git@github.com:Lambda-School-Labs/labs-api-starter.git NEW-REPO-NAME
    > rm -rf ./NEW-REPO-NAME/.git
    ```

- run: `npm install` to download all dependencies.
- run: `cp .env.sample .env` and update the enviornment variables to match your local setup.
- run: `npm run knex -- migrate:latest` to create the starting schema.
- run: `npm run knex -- seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm watch:dev` to start nodemon in local dev enviornment.

## Contributing

### ESLint and prettier

[ESLint](https://eslint.org/) and [prettier](https://prettier.io/) are already
configured with Lambda Labs standards and ready to go. These must be ran from
the CLI prior to commiting code in the following ways:

- `npm run lint` to view all purposed fixes.
- `npm run lint:fix` to apply fixes to eslint issues.
- `npm run format` to apply the standards defined by eslint/prettier config.

Alternatively you can install plugins for your editor of choice.
