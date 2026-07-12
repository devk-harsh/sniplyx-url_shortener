# Sniplyx

Sniplyx is a lightweight URL shortener backend built with Node.js, Express, TypeScript, and Zod. It provides a simple API for creating short links and redirecting them to their original long URLs.

## Features

- Create short URLs from long URLs
- Validate incoming request payloads with Zod
- Redirect short codes to their target URLs
- Request correlation logging with Winston
- Structured error handling middleware

## Project Structure

```text
src/
  config/              # Environment and logger config
  controllers/         # Request handlers
  middlewares/         # Error and request middleware
  routers/             # API and redirect routes
  services/            # In-memory URL store
  utils/               # Shared utilities and errors
  validators/          # Request validation schemas
  server.ts            # App entry point
```

## Tech Stack

- Node.js
- Express
- TypeScript
- Zod
- Winston
- UUID
- http-status-codes

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
npm install
```

## Running the Project

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm run start
```

The server will start on the port defined in your environment or default to `3001`.

## Environment Variables

Create a `.env` file in the project root with values like:

```env
PORT=3001
API_VERSION=v1
```

## API Endpoints

### Health check

```http
GET /api/v1/health
```


### Shorten URL

```http
POST /api/v1/urls/shorten
Content-Type: application/json
```

Request body:

```json
{
  "longUrl": "https://example.com"
}
```

Response example:

```json
{
  "success": true,
  "message": "URL shortened successfully",
  "data": {
    "longUrl": "https://example.com",
    "shortCode": "abc123",
    "shortUrl": "http://localhost:3001/s/abc123"
  }
}
```

### Redirect short URL

```http
GET /s/:shortCode
```

If the short code exists, the server redirects the client to the original URL. If not, it returns a `404` response.

## Validation

The app validates the request body using Zod schemas. Invalid URLs return a `400` response with validation details.

## Logging

The app uses Winston to log requests and application events to the console and to the `logs/` directory.

