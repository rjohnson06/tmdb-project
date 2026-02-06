This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Requirements
Node.js latest version

## Getting Started

1. Install dependencies
```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

## Project Structure

### API

API is implemented using Next.js API routes :

https://nextjs.org/docs/pages/building-your-application/routing/api-routes

Typescript types for TMDB api were generated from TMDB open api spec using : 
```bash
npx openapi-typescript https://developer.themoviedb.org/openapi/tmdb-api.json -o src/lib/tmdb/types.ts
```

We use an openapi typed client in the nextjs server to access TMDB api. See: [client.ts](lib/tmdb/client.ts)

Client for calling our Next.js api is located here: [clientSideClient.ts](lib/tmdb//clientSideClient.ts)