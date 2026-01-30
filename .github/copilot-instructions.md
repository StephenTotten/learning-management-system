# Copilot / Agent Instructions for Learning Management System 🚀

Purpose
- Short: help an AI agent be immediately productive with this repo.

Big picture (what to know first)
- Full-stack app: React client (client/) + Express + Sequelize server (server/).
- Client uses a dev proxy to reach the API (`client/package.json` -> `proxy: "http://localhost:5000"`).
- Server initializes DB each start: `server/index.js` calls `sequelize.sync({ force: true })` and runs `seeders/seed.js` — database is ephemeral by default.

Key integration points & data flow
- Client -> Server: fetch calls to `/api/*` (e.g., `/api/courses`, `/api/auth/login`, `/api/enrollments`). See `client/src/pages/*` for concrete examples.
- Models: `server/models/{User,Course,Enrollment}.js` with associations defined in `server/models/index.js` (many-to-many through Enrollment).
- Auth: `server/routes/auth.js` implements signup/login and returns a plain `user` object (no JWT). The client stores this in localStorage via `client/src/context/AuthContext.js` under key `user`.
- Enrollment endpoints include Course in the response (see `server/routes/enrollments.js` -> `GET /user/:userId`).

Important project-specific conventions & gotchas ⚠️
- DB dialect mismatch: README mentions PostgreSQL, but `server/config/db.js` uses MySQL (`dialect: 'mysql'`) and depends on `mysql2`. Confirm target DB before changes.
- Unsafe defaults: passwords are stored and compared in plaintext (no hashing) and there is no token-based authentication. Treat auth-related code as insecure and isolated when making automated changes.
- Ephemeral DB on dev start is **opt-in** via `DB_RESET=true`: when set the server will run `sequelize.sync({ force: true })` and reseed. By default the server will *not* reset or reseed the database to avoid accidental data loss. See `server/tests/dbReset.test.js` which verifies the opt-in behavior.
- CommonJS on server (require/module.exports) vs ESM in client (import/export). Don't mix module systems without changing `package.json` `type` fields.

How to run & debug locally (commands)
- Start server (dev):
  - cd server && npm run dev (uses nodemon)
- Start client (dev):
  - cd client && npm start
- Build client for production:
  - cd client && npm run build
  - server currently does not serve the client build automatically — a production deployment step is needed (e.g., serve static files or proxy).

Where to look for common tasks (filenames)
- API routes: `server/routes/*.js` (auth, courses, enrollments)
- DB config: `server/config/db.js` and `server/config/config.js`
- Models & associations: `server/models/*.js` and `server/models/index.js`
- Seeding (sample data): `server/seeders/seed.js`
- Client pages showing patterns: `client/src/pages/{Login,Signup,Courses,Dashboard}.jsx`
- Client auth persistence: `client/src/context/AuthContext.js`

Suggested safe changes & tests for agents ✅
- When modifying DB sync/seed behavior, update `server/index.js` and add a dev-only check (ENV flag) to avoid data loss.
- If adding auth improvements, implement password hashing and return a token (update client to store token or use server sessions); add tests and update `AuthContext` accordingly.
- Add server tests for routes (e.g., supertest) and CI steps if you add persistent behavior.

What NOT to do automatically
- Do not enable persistent DB changes without adding migration safety or a dev-only flag — DB is intentionally reset on start.
- Do not change authentication behavior (password hashing, tokens) without adding tests and updating client flows — breaking changes will break local dev flow.

If something's unclear or missing
- Ask: which DB dialect should be canonical (Postgres vs MySQL)?
- Ask: is keeping `force: true` intended for local-only? Should we add an env flag (e.g., `DB_RESET=true`)?

Quick examples (copyable)
- Enroll in course (client -> server): POST `/api/enrollments` body `{ "userId": 1, "courseId": 2 }`
- Login: POST `/api/auth/login` body `{ "email": "john@example.com", "password": "password123" }` returns `{ user: { id, email, firstName, lastName, role } }` which client stores in localStorage.

Thanks — if you want, I can update the README to resolve the DB mismatch and/or change `sequelize.sync({ force: true })` to a safer dev-only pattern. Which would you prefer? 💡
