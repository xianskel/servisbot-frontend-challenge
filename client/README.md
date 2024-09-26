# Servisbot Frontend Challenge

## Install

`npm install` from within the client package

## Run

`npm start` will run a dev build on localhost:3000

`npm run build` will generate a production build

Note: The dev build doesn't perform type checking. You'll need to run a prod build for this

## Test

### Unit tests

The unit tests use Vitest and React Testing Library

`npm test` will run the unit tests

`npm run test:watch` will run the unit tests in watch mode

### e2e tests

The e2e tests were created using Cypress

The tests expect the app to be running on https://localhost:3000

`npm run e2e` will launch the Cypress browser console, where you can find and run the tests in a live browser

`npm run e2e:headless` will run the tests in headless mode within the terminal

Note: both modes require a dev build of the app to be running

## Notes

Some observations around the provided data:

- The workers referenced the bots by their name (mutable field) instead of their id (immutable field). This was the only thing I fixed in the provided data.
- Some of the log data is corrupted. It appears that some workers share logs with multiple bots. This breaks the defined relationship (Bot 1:M Worker). I didn't edit this data, but accounted for this when retrieving the logs for a worker.

I just mocked an api using axios-mock-adapter as it was quick to do and behaves like a standard REST api. Apologies for the nasty regex.

I wasn't sure about how much I could alter the provided data's structure. If I decided to display all the bots and workers in the same view, I would have nested an array of workers inside their associated bot. In the end, I only changed the bot reference within the workers.json

It didn't state whether I needed to display every property when showing a list of workers or bots. I took some liberty here and only displayed what I deemed necessary. I also hide some fields when viewing on smaller screen sizes
