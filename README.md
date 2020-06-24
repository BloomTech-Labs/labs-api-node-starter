# Basic node API

> **Disclaimer:** This application is currently in Alpha and is not ready for
> production. Please use at your own risk as things will change almost daily.

## Requirements

- [Labs Engineering Standard requirements found here](https://labs.lambdaschool.com/topics/node-js/)

## API doc

All routes can be viewed in the [DOCUMENTATION.md](DOCUMENTATION.md) file

## Getting Started

- Install [docker](https://docs.docker.com/get-docker/) for your platform
- Fork and clone the repo to install it as your own remote.
  - **note** please [be sure to set your remote](https://help.github.jp/enterprise/2.11/user/articles/changing-a-remote-s-url/) for this repo to point to your Labs Team Repository.
  - Alternatively you can clone this repo then remove the git folder to initialize a new repo

    ```bash
    > git clone --depth=1 --branch=master git@github.com:Lambda-School-Labs/labs-api-starter.git NEW-REPO-NAME
    > rm -rf ./NEW-REPO-NAME/.git
    ```

- run: `npm install` to download all dependencies.
- run: `docker-compose up` to start up the postgresql database
- run: `npm run knex -- migrate:latest` to create the starting schema
- run: `npm run knex -- seed:run` to populate your db with some data
- run: `npm start` to start your local development server.
