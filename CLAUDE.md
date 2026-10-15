# foreman-proof-node

A tiny Node library used to prove Foreman end to end.

## Rules

- Tests first: every behaviour gets a `node:test` test before its implementation.
- Node built-ins only; no dependencies.
- Keep functions small and pure; one export per behaviour.
- `npm test` must pass before every commit.
