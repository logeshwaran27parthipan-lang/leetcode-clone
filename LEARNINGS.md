# LEARNINGS.md

> Personal learning journal — Logeshwaran Parthipan
> Project: LeetCode Clone (Full Stack)
> Updated after every phase

---

## How to use this file

After every phase — add what you learned. Not textbook definitions.
Write it like you're explaining to your past self from one week ago.
This becomes your revision notes, interview prep, and proof of growth.

---

## Phase 0 — Project Setup
**Completed: March 18, 2026**

### Git and GitHub

- `git init` creates a hidden `.git` folder — that's what makes a folder a Git repo
- `git add .` stages files — it doesn't save them yet, just marks them ready
- `git commit` is the actual save — like a checkpoint in a game
- `git push` sends your commits to GitHub — GitHub is just a cloud backup
- `git remote add origin <url>` connects your local repo to GitHub — you only do this once
- **Biggest lesson:** `.gitignore` only ignores NEW files. If you committed something already, `.gitignore` alone won't remove it — you need `git rm --cached`
- `git rm -r --cached node_modules` — removes node_modules from Git tracking without deleting it locally
- `git pull --rebase origin main` — fetches GitHub changes and replays your commits on top cleanly. Use this when push is rejected.

### Project Structure

- Every Node.js project needs a `package.json` — it's the identity card of the project
- `node_modules/` should NEVER be committed — it's 200MB+ and anyone can recreate it with `npm install`
- `.env` should NEVER be committed — it contains passwords and secret keys
- Two separate `package.json` files — one in `client/`, one in `server/`. They are completely independent projects.

### Tools

- Vite creates a full React + TypeScript project with one command: `npm create vite@latest client -- --template react-ts`
- VS Code extensions: Prisma (schema highlighting), ESLint (catch errors), Prettier (auto-format)
- Windows PATH — a list of folders Windows checks when you type a command. PostgreSQL needs to be added here so `psql` works anywhere.

---

## Phase 1 — Backend Core
**Completed: March 20, 2026**

### Node.js and Express

- Node.js lets JavaScript run on a server — not just in a browser. Same language as React, different environment.
- Express is a framework that sits on top of Node.js — it gives you clean syntax to define routes
- `app.get('/api/health', ...)` — defines what happens when someone sends GET /api/health
- `app.use(express.json())` — middleware that converts raw request body into a JavaScript object. Must go BEFORE routes.
- `app.use('/api/auth', authRouter)` — mounts a router. Express combines the path: `/api/auth` + `/login` = `/api/auth/login`
- `Router` from Express — a mini Express app. Lets you organise routes by feature in separate files. Same `.get()`, `.post()` methods as `app`.
- `export default router` in route files — exports the router so `server.ts` can import it
- `import authRouter from './routes/auth.routes'` — the name you give it on import is yours to choose. Convention is `[feature]Router`.

### TypeScript on the Backend

- Same TypeScript as frontend — same types, same imports, same syntax
- `import express, { Request, Response } from 'express'` — import the default + named exports together
- `req: Request, res: Response` — proper types for Express route handlers. Better than `any`.
- `tsconfig.json` on backend: `rootDir: ./src` (your code), `outDir: ./dist` (compiled output)
- `ts-node` — runs `.ts` files directly without compiling first. Used in development.
- `nodemon` — watches your files and auto-restarts the server on every save. Massive time saver.

### npm Scripts

- `npm run dev` — runs `nodemon src/server.ts` — starts server with auto-restart
- `npm run build` — runs `tsc` — compiles TypeScript to JavaScript in `dist/`
- `npm run start` — runs `node dist/server.js` — runs compiled JS in production
- `-D` flag in `npm install -D` — installs as devDependency. Tools only needed during coding, not in production.

### Environment Variables

- `.env` file stores secrets: `DATABASE_URL`, `JWT_SECRET`, `PORT`
- `dotenv.config()` must be called at the TOP of `server.ts` — before anything reads `process.env`
- `process.env.PORT || 4000` — use PORT from .env, fallback to 4000 if not set
- In React (Vite): variables must start with `VITE_` and are accessed via `import.meta.env.VITE_API_URL`
- `.env` never goes to Render/Vercel automatically — you add environment variables manually in the hosting dashboard

### PostgreSQL

- PostgreSQL is a relational database — stores data in tables, like a spreadsheet that never loses data
- `psql -U postgres` — connect to PostgreSQL as the admin user
- `psql -U postgres -d leetcode` — connect directly to the `leetcode` database
- `CREATE DATABASE leetcode;` — creates a new database (semicolon required in psql)
- `\l` — list all databases, `\dt` — list all tables, `\d "TableName"` — show table columns, `\q` — quit
- The DATABASE_URL format: `postgresql://user:password@host:port/databasename` — the last part is which database to use
- PostgreSQL can have many databases on the same server — the name at the end of the URL picks the right one

### Prisma ORM

- Prisma translates TypeScript into SQL — you write `prisma.user.findMany()` instead of `SELECT * FROM "User"`
- `schema.prisma` — blueprint file where you define your tables as models
- `prisma.config.ts` — Prisma 6+ stores the DATABASE_URL here instead of schema.prisma
- `npx prisma migrate dev --name init` — reads schema, generates SQL, runs it on your database
- Every migration creates a `.sql` file in `prisma/migrations/` — version history of your database changes
- `_prisma_migrations` table — Prisma creates this automatically to track which migrations ran

### Prisma Schema Keywords

- `model` — declares a table. `model User {}` creates a `User` table and `User` TypeScript type
- `String`, `Int`, `Boolean`, `DateTime` — Prisma field types
- `@id` — marks a field as the primary key — every model needs exactly one
- `@default(uuid())` — auto-generates a unique ID for every new record
- `@default(now())` — auto-sets to current timestamp on creation
- `@unique` — no two rows can have the same value. Use on email, username — NOT on password
- `enum` — a field that can only hold one of predefined values: `EASY`, `MEDIUM`, `HARD`
- `String[]` — an array of strings. PostgreSQL stores this as an array column.
- `@relation(fields: [userId], references: [id])` — defines a foreign key. `fields` = column in THIS table, `references` = column in OTHER table
- Parent side of relation uses `[]` (one-to-many): `submissions Submission[]`
- Child side uses `@relation` with `fields` and `references`: `user User @relation(...)`

### REST API

- REST API = a set of URLs your frontend calls to get or send data
- 4 HTTP methods: GET (read), POST (create/send), PUT (update), DELETE (remove)
- Every request has: URL + method + headers + optional body
- `Authorization: Bearer <token>` header — how JWT is sent on every protected request
- Status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error
- `/api/` prefix on all routes separates backend URLs from frontend page URLs

### Postman

- Postman tests API routes without needing a frontend
- Golden rule: if it works in Postman, the backend is correct. Bugs after that are in the frontend.
- Always test every route in Postman before building the frontend for that feature

### Issues Fixed and Lessons

- **node_modules in GitHub** — always create `.gitignore` BEFORE the first `git add .`
- **Prisma breaking change** — Prisma 6 moved DATABASE_URL from `schema.prisma` to `prisma.config.ts`
- **psql not found** — PostgreSQL path must be added to Windows User PATH via `sysdm.cpl`
- **git push rejected** — means GitHub has commits you don't. Fix: `git pull --rebase origin main` then push

---

## Upcoming — Phase 2 (Authentication)

Things I know I'll need to learn:
- How bcrypt hashes a password
- How JWT tokens are created and verified
- How middleware checks a token before allowing access to a route
- What a protected route actually looks like in Express

---

*Last updated: March 20, 2026*
*Next update: After Phase 2 completes*

//
## Phase 2 — Authentication
**Completed: March 21, 2026**

### bcrypt

- bcrypt hashes passwords — converts "mypassword123" into "$2b$10$N9qo8..." — unreadable and irreversible
- `bcrypt.hash(password, 10)` — the 10 is salt rounds — how many times it scrambles. More = slower = safer. 10 is industry standard.
- `bcrypt.compare(password, hash)` — returns true or false. Never decrypts — just re-scrambles and compares.
- Never store plain text passwords. Ever. Even in development.

### JWT

- JWT = JSON Web Token — a small encrypted string that proves who you are
- `jwt.sign({ userId }, secret, { expiresIn: '7d' })` — creates a token containing userId, signed with your secret
- `jwt.verify(token, secret)` — checks if token is real and not expired. Returns decoded payload or throws error.
- Token has 3 parts separated by dots: header.payload.signature
- Server stores NOTHING — the token itself carries the user identity
- Token expires after 7 days — user must log in again to get a new one

### Sessions vs JWT

- Sessions — server stores "user is logged in" in database. Every request hits the database.
- JWT — server stores nothing. Token proves identity. Stateless.
- JWT scales better — any server can verify any token without hitting the database
- JWT weakness — can't instantly invalidate a token. It's valid until it expires.
- Your project uses JWT — correct choice for React + Express REST API

### Auth Middleware

- Middleware runs between the request arriving and the route handler running
- Three parameters: (req, res, next) — the extra `next` is what passes the request forward
- Call `next()` to allow the request through
- Call `res.status(401).json(...)` to block it — never call `next()` after blocking
- Never send a response AND call next() — pick one
- `req.headers.authorization` — where the JWT token comes from on every request
- Format is always: `"Bearer <token>"` — split by space to get just the token
- `(req as any).userId` — attaching data to req so route handlers can read it
- `as any` — TypeScript workaround when you add custom properties to req

### Express Patterns

- Named export `export const protect` — use when file has or could have multiple exports
- Default export `export default router` — use when file has one main thing
- `app.use('/api/submissions', protect, submissionsRouter)` — middleware applied to specific route only
- Order matters — middleware must come before the router in app.use()

### Postman Tips

- Body must be raw + JSON — not Text. Check content-type in response headers to confirm.
- Authorization tab → Bearer Token → paste just the token string, not the JSON
- 401 = unauthorized (wrong/missing token), 404 = route not found, 500 = server crashed

### Issues Fixed

- Login returned "Something went wrong" — Postman was sending text/plain not JSON. Fixed by selecting JSON in body dropdown.
- Middleware returning 404 on valid token — correct behaviour. Submissions router is empty. Middleware passed, no route matched.

*Last updated: March 21, 2026*
*Next update: After Phase 3 completes*
