# Music WALL

[music-wall.netlify.app](https://music-wall.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/2346553d-969a-494e-94db-5b91cdaff7cc/deploy-status)](https://app.netlify.com/sites/music-wall/deploys)

View and navigate your listening habits from spotify and lastfm.

```bash
pnpm install
```

## Developing

### Frameworks

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Skeleton Dev](https://www.skeleton.dev/)

Once you've installed dependencies with `pnpm install` or `npm install`, start a development server.

```bash
pnpm run dev

# Start the server and open the app in a new browser tab
pnpm run dev -- --open
```

### Environment Variables

Copy the `.env.example` file to `.env` and fill in the values.

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
