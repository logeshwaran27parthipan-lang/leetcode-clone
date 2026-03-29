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

## Phase 3 — Problems API
**Completed: March 21, 2026**

### New Prisma methods
- `prisma.problem.findMany()` — returns ALL rows from a table as an array
- `prisma.problem.findUnique({ where: { slug } })` — returns ONE row matching the condition. Returns null if not found.
- Prisma auto-generates table properties from model names — `model Problem` becomes `prisma.problem`

### New Express patterns
- `req.params.slug` — reads URL parameters. In route `/:slug`, the value after / is available as `req.params.slug`
- `router.get('/:slug', ...)` — the `:` prefix makes it a dynamic parameter

### Seeding
- `prisma/seed.ts` — a script that inserts sample data for development
- `npx ts-node prisma/seed.ts` — runs the seed file directly
- `prisma.$disconnect()` — closes database connection so script exits cleanly
- Always seed before testing GET routes — can't test empty data

### General lessons
- Always return 404 with a message when findUnique returns null
- POST routes that create data return 201 status + the created object
- `~$` files are Word temp files — add `~$*` to .gitignore
- Object destructuring uses {} — array destructuring uses []

*Last updated: March 22, 2026*
*Next update: After Phase 4 completes*

## Phase 4 — Frontend Setup
**Completed: March 22, 2026**

### CORS
- CORS = Cross Origin Resource Sharing — browser security rule blocking requests between different origins
- Origin = protocol + domain + port. Frontend (5173) and backend (4000) are different origins — different ports
- Without cors() middleware — browser blocks ALL frontend requests to backend silently
- app.use(cors()) adds Access-Control-Allow-Origin: * header — browser allows the request
- In production — restrict to specific domain: app.use(cors({ origin: 'https://yourapp.vercel.app' }))

### Axios
- axios.create({ baseURL }) — creates reusable instance with preset URL prefix
- api.get('/problems') automatically sends to http://localhost:4000/api/problems
- axios wraps response — actual data is in response.data not response directly
- Always check network errors in browser console — the URL shown reveals typos immediately

### React Router
- BrowserRouter wraps the whole app — enables URL routing
- Routes holds all Route definitions
- Route maps a path to a component — path="/problems/:slug" captures dynamic segment
- Link component — navigates without page reload. Use instead of <a> for internal links
- useParams() — reads URL parameters. const { slug } = useParams() gets the :slug value
- Name inside {} must match the parameter name defined in the Route path

### Data Fetching Pattern
- useState<Type[]>([]) — always type your state arrays so TypeScript knows what's inside
- useState<Type | null>(null) — use null as initial value when data hasn't loaded yet
- Guard clause: if (!data) return <div>Loading...</div> — prevents null crashes
- useEffect can't be async directly — create async function inside and call it immediately
- [] dependency = runs once on mount. [slug] = runs on mount and when slug changes
- response.data — where axios puts your actual JSON. response itself is the wrapper object

### General Lessons
- key prop in lists must be unique and stable — use ID not array index
- Object destructuring {} extracts by name. Array destructuring [] extracts by position
- UUID vs auto-increment: UUID is unguessable, works across servers, no conflicts
- ~$* in .gitignore — prevents Word temp files from being committed
- Two terminals needed: one for frontend (port 5173), one for backend (port 4000)

*Last updated: March 22, 2026*
*Next update: After Phase 5 completes*

## Phase 5 — Frontend Authentication

**Completed: March 2026**

### Auth Context

* Context = global state — avoids prop drilling
* `createContext()` — creates shared state container
* `AuthProvider` wraps app — provides auth to all components
* `useContext(AuthContext)` — access auth state anywhere
* `children` — components inside Provider
* `React.ReactNode` — any renderable React content

### Token Storage (localStorage)

* `setItem` — store data in browser
* `getItem` — retrieve stored data
* `removeItem` — delete stored data
* Stores only strings — use JSON for objects
* Persists after refresh — keeps user logged in
* Used in `useState` for initial token load

### Auth Flow

* Login/Register → API → token → store → set state → redirect
* Logout → remove token → clear state
* localStorage = persistence, state = reactivity
* Context replaces direct localStorage usage

### Form Handling

* `e.preventDefault()` — stops page reload
* Use `onSubmit` on form — not `onClick` on button
* `React.FormEvent<HTMLFormElement>` — correct event type

### Validation

* Frontend — fast feedback, better UX
* Backend — real security, cannot be bypassed
* Both required — UX + protection
* `||` = ANY condition (used for required fields)
* `&&` = ALL conditions (not for empty checks)
* `return setError()` — shows error + stops execution

### Password Rules

* Length ≥ 8 characters
* Must include special character
* Regex `/[!@#$%^&*]/` — checks allowed symbols
* `!` negates — detects missing condition

### HTTP Status Codes

* 400 — Bad Request (invalid input)
* 401 — Unauthorized (wrong credentials)
* 200 — OK (login success)
* 201 — Created (register success)
* 500 — Server Error

### Navigation

* `useNavigate()` — get navigation function
* `navigate('/')` — redirect programmatically
* Used after login/register
* Naming convention — lowercase `navigate`

### General Lessons

* Use separate `if` statements — don’t combine logic
* Return responses directly — `return res.status(...)`
* Frontend = UX, Backend = security
* Backend is final authority — frontend can be bypassed
* JWT starting with `eyJ` = valid encoded token

*Last updated: March 24, 2026*
*Next update: After Phase 6 completes*

## Phase 6 — Code Editor & Submissions
**Completed: March 2026**

### Monaco Editor
- @monaco-editor/react — React wrapper for VS Code's editor
- import Editor from "@monaco-editor/react" — default import, not named
- import type { editor } from "monaco-editor" — imports only TypeScript types, zero bundle size impact
- onMount fires once when editor finishes loading — store editor instance here
- editor.IStandaloneCodeEditor — correct TypeScript type for Monaco editor instance
- editorRef.current.getValue() — reads current code from editor

### useRef vs useState for Editor
- useState + onChange = re-render on every keystroke = laggy editor
- useRef = stores reference without causing re-renders = correct for editors
- useRef(null) — starts null, gets value after onMount fires
- Always guard: if(!editorRef.current) return — editor may not have loaded yet

### import type
- import type { X } from "y" — brings in TypeScript type only, no runtime code
- Regular import brings in actual JavaScript — increases bundle size
- Use import type whenever you only need something for type annotations

### Axios Interceptor
- Interceptor = frontend middleware — runs before every axios request automatically
- Without it — must manually attach token to every single API call
- api.interceptors.request.use((config) => { ... return config })
- config — the request object containing URL, headers, body
- config.headers.Authorization = `Bearer ${token}` — attaches token
- return config — ALWAYS required — without it request never leaves
- localStorage.getItem("token") — reads token inside interceptor
- Bearer prefix — required because auth.middleware.ts checks header.startsWith("Bearer ")

### Submissions Backend
- prisma.submissions.findMany({ where: { userId } }) — filter by condition
- import { Status } from "@prisma/client" — import Prisma enum types
- Status.ACCEPTED — correct typed enum value, not plain string "ACCEPTED"
- (req as any).userId — userId attached by protect middleware, available in all protected routes
- 201 status for POST (created), 200 status for GET (success)
- Status hardcoded as ACCEPTED for now — real test case validation is future work

### Protected Routes
- ProtectedRoute component — checks token before rendering page
- if(!token) return <Navigate to='/login' /> — redirect if not logged in
- <>{children}</> — React Fragment — renders wrapped content with no extra HTML
- children prop — whatever components are wrapped inside the component
- Navigate from react-router-dom — programmatic redirect component
- Wrap route in App.tsx: <ProtectedRoute><Page /></ProtectedRoute>

### Null Guards
- Async values start as null — API data, refs, external libraries
- Always guard before using: if(!value) return
- Guard stops function silently — page stays visible, only handler stops
- problemDetail starts null → guard before using problemDetail.id
- editorRef.current starts null → guard before calling .getValue()

### HTTP Status Codes (complete set used so far)
- 200 — OK — successful GET/read
- 201 — Created — successful POST/create
- 400 — Bad Request — invalid input from user
- 401 — Unauthorized — missing or invalid token
- 404 — Not Found — resource doesn't exist
- 500 — Internal Server Error — something crashed on server

### General Lessons
- Frontend protection + backend protection both needed — different purposes
- Frontend ProtectedRoute = good UX — redirect before page loads
- Backend protect middleware = real security — rejects requests without valid token
- Regex /[!@#$%^&*]/.test(string) — checks if string contains special character
- UUIDs in submissions — userId and problemId stored as UUIDs, not display names
- Submissions page shows raw UUIDs — UI improvement (showing problem titles) is future work

*Last updated: March 25, 2026*
*Next update: After Phase 7 completes*

## Phase 7 — Polish & Deploy
**Completed: March 2026**

### Deployment Architecture
- Frontend → Vercel (free, auto-deploys from GitHub)
- Backend → Render Web Service (free tier, sleeps after 15min inactivity)
- Database → Render PostgreSQL (free tier, persistent)
- Each layer deployed separately — they communicate via HTTP

### Render Deployment
- Root directory must be set to `server` — not repo root
- Build command: `npm install && npm run build && npx prisma generate && npx prisma migrate deploy`
- Start command: `npm start` — runs `node dist/server.js`
- Only `dependencies` are installed on Render — not `devDependencies`
- TypeScript, @types/*, ts-node must be in `dependencies` for Render to compile
- Environment variables set on Render dashboard — never in code

### Vercel Deployment
- Root directory set to `client`
- Vite auto-detected — build command `vite build`, output `dist`
- Environment variables set on Vercel dashboard
- `VITE_` prefix required for Vite to expose variables to frontend
- `import.meta.env.VITE_API_URL` — how Vite reads env vars (not process.env)
- Every push to main = new deployment automatically

### Environment Variables
- Never commit `.env` files — always in `.gitignore`
- Backend uses `process.env.VARIABLE_NAME` (Node.js)
- Frontend uses `import.meta.env.VITE_VARIABLE_NAME` (Vite)
- Set separately on each platform dashboard

### CORS in Production
- `cors()` with no config = any origin allowed = security risk
- Always restrict to specific origins in production
- origin accepts array — use for multiple URLs (localhost + production)
- Always include full protocol: `https://` — missing it = invalid value error
- `credentials: true` — required for Authorization header to work cross-origin
- Vercel preview URLs change every deploy — use stable production URL
- methods array — explicitly list allowed HTTP methods

### Prisma in Production
- `prisma generate` — creates TypeScript client from schema — needed every build
- `prisma migrate deploy` — applies migrations to database — creates tables
- Without migrate deploy — production DB has no tables — every API call crashes
- Run both in build command on Render

### Cold Start Problem
- Render free tier sleeps after 15 minutes of inactivity
- First request after sleep = 30-60 second delay
- Solution 1: cron-job.org — pings /api/health every 10 minutes — server never sleeps
- Solution 2: warm-up fetch in App.tsx — wakes server when user opens app
- Solution 3: loading state — user sees feedback during wait
- Best: combine cron-job.org + loading state

### Loading State Pattern
- `useState(false)` for isLoading
- `setIsLoading(true)` before API call
- `setIsLoading(false)` in `finally` block — always runs whether success or error
- `finally` — runs after try AND catch — perfect for cleanup
- `disabled={isLoading}` on button — prevents double submission
- Keep form visible, only change button text — better UX than hiding form

### Production Debugging
- Always check browser DevTools Network tab first
- Error message tells you exactly what's wrong
- CORS errors show which origin was blocked and what was expected
- Status codes: 200=ok, 201=created, 400=bad input, 401=unauthorized, 500=server crash
- Check Render build logs for deployment errors

*Last updated: March 28, 2026*
*Next update: After Phase 8 completes*