# EventBank Operations micro-frontend

The operations screen of [EventBank](https://github.com/marcelo-roman/eventbank-platform): every event-store subscription of every service, its checkpoint, how far behind the head it is, and a button to rebuild a read model by replaying all events from the start.

It is a [Module Federation](https://module-federation.io) remote of [eventbank-shell](https://github.com/marcelo-roman/eventbank-shell): it exposes `./App`, which the shell mounts at `/projections`. It ships with its own query client and its own styles, and uses the shell's theme for everything shared.

## Running

```bash
pnpm install
pnpm dev          # http://localhost:5176, standalone, API proxied to the gateway on :5100
pnpm build        # dist/remoteEntry.js is what the shell loads
pnpm test
```

Standalone, the page links the theme from the shell dev server at `http://localhost:5173/theme.css`, so start the shell too for the full look. To run everything at once, use [eventbank-platform](https://github.com/marcelo-roman/eventbank-platform).

## License

[MIT](LICENSE)
