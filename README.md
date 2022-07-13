# The WALL Client

This is a barebone client for the [`the-wall-api`](https://github.com/jmerilainen/the-wall-api).

Demo: https://the-wall.fly.dev

This project mainly demonstrates API interaction and e2e test between the Client and the API.

## Quickstart with Docker

To get project running locally with Docker, run

```sh
yarn docker:serve

# alias for "docker-compose -f docker-compose.local.yml up"
```

Install and run the [`the-wall-api`](https://github.com/jmerilainen/the-wall-api)
as well.

Open [http://localhost:5000](http://localhost:5000)

## Requirements

- Node.js `16.x`

## Development

1. Install dependecies

    ```sh
    npm install
    ```

2. Install and run the [`the-wall-api`](https://github.com/jmerilainen/the-wall-api)

3. Set envs

    ```sh
    export VITE_API_URL=http://localhost:3000` # match the url for the-wall-api

    # or via .env file or run "cp .env.example .env"
    ```

4. Start development server with watch mode

    ```sh
    npm run dev
    ```

5. Start coding

## Testing

### E2E

Project uses the Cypress for End-to-End (E2E) tests. Tests are in `cypress/e2e` directory.

To run e2e tests:

1. Serve the build

    ```sh
    npm run build  && npm run preview
    ```

2. Run the test suites

    ```sh
    npm run test:e2e
    ```

## Deployment

Service is hosted in [Fly.io](https://fly.io).

Deployment is made to production via GitHub actions on push to `main` branch.
