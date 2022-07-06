# The WALL Client

This is a barebone client for the [`the-wall-api`](https://github.com/jmerilainen/the-wall-api).

Demo: https://the-wall.fly.dev

This project mainly demonstrates API interaction and e2e test between the client and the api.

## Quick install with Docker

Run

```sh
$ npm run docker:serve

# equals: docker-compose -f docker-compose.local.yml up
```

Install and run the [`the-wall-api`](https://github.com/jmerilainen/the-wall-api)
as well.

Open [http://localhost:5000](http://localhost:5000)

## Development

**Requirements**

- `node 16.x`

`npm install` to install dependencies

Install and run the [`the-wall-api`](https://github.com/jmerilainen/the-wall-api)
as well.

`npm run dev` to run dev server

Set env `VITE_API_URL=http://localhost:3000` via `.env` file or run `cp .env.example .env`

## Testing

Build and serve the preview app for cypress (the [`the-wall-api`](https://github.com/jmerilainen/the-wall-api) should be running as well):

`npm run build && npm run preview`

Then run test suites:

`npm run test:e2e`

## Deployment

Service is hosted in [fly.io](https://fly.io). Deployment is made via GitHub actions on push to `main` branch.
