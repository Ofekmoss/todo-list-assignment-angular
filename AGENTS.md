# Agent notes

- Frontend-only Angular 12 app. Its backend is NOT in this repo: `src/app/shared/todo.constants.ts` hardcodes `DOMAIN = "http://localhost:3000"` and expects a REST API (`GET/POST /todos`, `PUT/DELETE /todos/:id`) plus a socket.io server that relays the `todo-change` event.
- Without that backend the page renders (title + "Add task" input), but the list stays empty and HTTP/socket calls fail.
- Use Node 16 (`node:16`). Angular 12 / webpack 4 breaks on Node 17+ because of OpenSSL changes.
- Dev setup: `docker compose -f docker-compose.base44.yml up -d` runs `npm ci`, then `ng serve` on container port 4200, mapped to host port 3000. It uses `--poll` for bind-mount reload and `--allowed-hosts .$BASE44_SANDBOX_HOST_DOMAIN` so the preview host is accepted. These are sandbox-only flags; shared config is unchanged.
- The first boot takes about 2 minutes (npm ci + ngcc). `node_modules` lives in a named volume.
