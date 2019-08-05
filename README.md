# Adonis AdminLTE

This repo is an implementation of a starter pack for Adonis v.4.x with some tweaks.
It is just an example of how you can implement front-end stuff and authentication.

## What's inside?

- Sqlite as a DB layer
- Auth controller (login, logout)
- Auth emails (welcome email, reset password email)
- Auth validators
- Webpack v4.x default config
- LESS + ES6+
- Folder structure for views

## Details
- `webpack` configured to compile three stylesheets and scripts for `application`, `manage` and `auth` section of the app
- a special `webpack_asset` global added to `View`, to require those js/css files in views
- a special `host` global added to `View`, to correctly insert links in emails, it take value from `.env` file as a `APP_URL` variable
- a set of methods in `Auth` controller, including `login`, `reset`, `logout`
- `welcome` and `forgot` emails for account confirmation and password reset
- `APP_FROM_TITLE` and `APP_FROM_EMAIL` in `.env` file describe and form a `message.from()` string, that is used to send default transactional emails

## Setup

Manually clone the repo and then run `npm install`.
```bash
npm install
```
Make a copy of .env.example rename it to .env

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
and run
```js
adonis seed
```
Run adonis key:generate to generate the secret key
```js
adonis key:generate
```
## How to run
Two terminal windows
- `npm run buildDev` build font-end
-  `npm run start` for development
