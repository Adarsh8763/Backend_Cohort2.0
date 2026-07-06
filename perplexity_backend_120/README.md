<div align="center">

<!-- Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3B82F6,100:1E40AF&height=200&section=header&text=Vasuk%20AI&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=AI-Powered%20Search%20Assistant&descAlignY=60&descSize=22" alt="Vasuk AI Banner" width="100%"/>

<br/>

# Vasuk AI

**Ask anything. Get intelligent, real-time answers — powered by Mistral AI and live web search.**

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

<br/>

[🚀 Live Demo](https://backend-cohort2-0-3-lx0x.onrender.com) · [📖 Docs](#-installation) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Demo](#-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Workflow](#-workflow)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Performance](#-performance)
- [Security](#-security)
- [Future Improvements](#-future-improvements)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgements](#-acknowledgements)
- [Support](#-support)

---

## 🧠 Overview

**Vasuk AI** is a full-stack, Perplexity-inspired conversational AI assistant that answers any question with up-to-date, web-sourced intelligence. Unlike static LLM chatbots frozen at a training cutoff, Vasuk actively searches the internet using [Tavily](https://tavily.com/) whenever a query demands current information, then synthesizes a concise, markdown-rich response via **Mistral AI** through **LangChain**.

### Why does it exist?

Most AI chatbots hallucinate or give outdated answers when asked about recent events. Vasuk solves this by wiring a **search-augmented LangChain agent** directly into the conversation loop — the model decides, autonomously, whether it needs to fetch live data before answering. The result is a chat assistant that is as capable as it is current.

### What problem does it solve?

| Problem | Vasuk's Solution |
|---|---|
| LLM knowledge cutoff | Real-time web search via Tavily |
| No conversation memory | Per-user chat history stored in MongoDB |
| Unreadable AI output | Full GFM Markdown rendering with syntax highlighting |
| Friction-free auth | JWT cookies + email verification flow |
| Stale UI on updates | Socket.io layer ready for streaming |

---

## 🎬 Demo

<div align="center">

### 🌐 Live Application

**[https://backend-cohort2-0-3-lx0x.onrender.com](https://backend-cohort2-0-3-lx0x.onrender.com)**

> The backend serves the compiled frontend bundle — visit the link above to use the app directly.

<br/>

### 📽️ Video Walkthrough

<p align="center">
  <img src="./assets/demo.gif" alt="Vasuk AI Demo" width="100%" />
</p>

</div>

---

## ✨ Features

- ✅ **AI-Powered Search** — A LangChain agent autonomously decides when to trigger Tavily web search, ensuring answers are grounded in live data rather than static training knowledge.
- ✅ **Mistral AI Backbone** — Uses `mistral-small-latest` for fast, cost-effective, and high-quality language generation.
- ✅ **Persistent Chat Sessions** — Every conversation is saved to MongoDB. Users can revisit, continue, or delete any previous chat from the sidebar.
- ✅ **Auto-Generated Chat Titles** — When a new chat begins, the AI generates a 2–4 word title from the first message — no manual naming required.
- ✅ **Markdown Rendering** — AI responses render full GitHub-Flavored Markdown: tables, code blocks, bold/italic, blockquotes, and hyperlinks — exactly as intended.
- ✅ **Real-Time Ready** — Socket.io is integrated and initialized on the server, laying the foundation for token-by-token streaming in a future iteration.
- ✅ **JWT Authentication** — Stateless, cookie-based auth with a 10-day expiry. No session storage needed on the server.
- ✅ **Email Verification** — On registration, users receive a signed JWT verification link via Gmail OAuth2. Unverified accounts cannot log in.
- ✅ **Input Validation** — Server-side validation via `express-validator` enforces username format, valid email, and strong password rules (min 6 chars, one uppercase, one digit).
- ✅ **Auto-Resize Textarea** — The chat input box dynamically expands up to 180px as the user types, then scrolls — exactly like modern chat UIs.
- ✅ **Suggestion Pills** — The welcome screen shows quick-start prompts to reduce the cold-start barrier for new users.
- ✅ **Responsive Sidebar** — A slide-in sidebar with backdrop dismiss, listing all past chats with delete support — mobile-first design.
- ✅ **Redux State Management** — Global chat state managed via Redux Toolkit keeps the UI perfectly synchronized without prop-drilling.
- ✅ **Dark-Mode-First Design** — A polished dark theme (`#0D1117` background, `#3B82F6` accent) built with SCSS custom properties for easy theming.

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| Redux Toolkit | 2.x | Global state management |
| React Router | 7 | Client-side routing |
| Axios | 1.x | HTTP client |
| Socket.io-client | 4.x | WebSocket connection |
| react-markdown | 10.x | GFM Markdown rendering |
| remark-gfm | 4.x | Markdown tables & strikethrough |
| SASS/SCSS | 1.x | Styling |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22.x | Runtime |
| Express | 5 | HTTP server framework |
| LangChain | 1.x | LLM orchestration & agent |
| @langchain/mistralai | 1.x | Mistral AI integration |
| Mongoose | 9.x | MongoDB ODM |
| Socket.io | 4.x | WebSocket server |
| jsonwebtoken | 9.x | JWT creation & verification |
| bcryptjs | 3.x | Password hashing |
| express-validator | 7.x | Request body validation |
| nodemailer | 8.x | Transactional email |
| morgan | 1.x | HTTP request logging |
| dotenv | 17.x | Environment variable loading |
| ioredis | 5.x | Redis client (token blacklist) |

### AI / External APIs

| Service | Role |
|---|---|
| **Mistral AI** (`mistral-small-latest`) | Core language model for reasoning & generation |
| **Tavily Search API** | Real-time internet search (up to 5 results, advanced depth) |
| **LangChain Agent** | Tool-calling loop that decides when to invoke Tavily |

### Database & Infrastructure

| Service | Role |
|---|---|
| **MongoDB Atlas** | Persistent storage for users, chats, and messages |
| **Redis** (RedisLabs) | Token blacklist for secure logout *(prepared, togglable)* |
| **Gmail OAuth2** | Transactional email via nodemailer |
| **Render** | Cloud deployment (backend + frontend static bundle) |

---

## 🏗 Architecture

Vasuk AI follows a classic **client–server** architecture with an AI agent service layer sitting between the REST API and external services.

```
Browser (React SPA)
        │
        │  HTTPS / Cookie-based JWT
        ▼
Express 5 REST API  ◄─── JWT Middleware ───► MongoDB Atlas
        │
        │  Tool-calling agent loop
        ▼
LangChain Agent (Mistral AI)
        │
        ├──── Knowledge sufficient? ──► Direct answer
        │
        └──── Needs live data? ──────► Tavily Search API
                                              │
                                        Web results returned
                                              │
                                        Synthesized response
```

### Application Flow

```mermaid
sequenceDiagram
    actor User
    participant Frontend as React Frontend
    participant API as Express API
    participant Agent as LangChain Agent
    participant Tavily as Tavily Search
    participant DB as MongoDB

    User->>Frontend: Types a message and presses Enter
    Frontend->>API: POST /api/chats/message { message, chatId }
    API->>API: identifyUser middleware (JWT cookie)

    alt New conversation
        API->>Agent: generateChatTitle(message)
        Agent-->>API: "2 to 4 word title"
        API->>DB: chatModel.create({ user, title })
    end

    API->>DB: messageModel.create({ role: "user", content })
    API->>DB: messageModel.find({ chat: chatId })
    API->>Agent: generateResponse(messageHistory)

    Agent->>Agent: Evaluate if live search is needed
    alt Needs real-time data
        Agent->>Tavily: searchInternet({ query })
        Tavily-->>Agent: Top 5 web results (JSON)
    end

    Agent-->>API: AI response text
    API->>DB: messageModel.create({ role: "ai", content })
    API-->>Frontend: { aiMessage, result, chat }
    Frontend->>Frontend: Dispatch to Redux store
    Frontend->>User: Render Markdown response
```

---

## 📁 Project Structure

```
perplexity_backend_120/
│
├── assets/                         # Project images and screenshots
│
├── Backend/                        # Express API server
│   ├── .env                        # Environment variables (never commit)
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js                   # Entry point — HTTP server + Socket.io init
│   ├── public/                     # Compiled frontend bundle (served by Express)
│   │
│   └── src/
│       ├── app.js                  # Express app, middleware stack, route mounts
│       ├── config/
│       │   ├── cache.js            # ioredis client
│       │   └── database.js         # Mongoose connection
│       ├── controllers/
│       │   ├── auth.controller.js  # Register, login, logout, email verify
│       │   └── chat.controller.js  # Send message, get chats/messages, delete
│       ├── middlewares/
│       │   └── auth.middleware.js  # JWT cookie verification
│       ├── models/
│       │   ├── chat.model.js       # { user, title }
│       │   ├── message.model.js    # { chat, content, role: "user"|"ai" }
│       │   └── user.model.js       # { username, email, password, verified }
│       ├── routes/
│       │   ├── auth.routes.js      # /api/auth/*
│       │   └── chat.routes.js      # /api/chats/*
│       ├── services/
│       │   ├── ai.service.js       # LangChain agent + Mistral AI
│       │   ├── internet.service.js # Tavily search wrapper
│       │   └── mail.service.js     # Nodemailer / Gmail OAuth2
│       ├── sockets/
│       │   └── server.socket.js    # Socket.io initialization
│       └── validation/
│           └── auth.validator.js   # express-validator rules
│
└── Frontend/                       # React + Vite SPA
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html                  # Root HTML, Google Fonts, meta tags
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── public/
    │   └── vite.svg
    │
    └── src/
        ├── main.jsx                # React root, Redux Provider, RouterProvider
        ├── app/
        │   ├── App.jsx             # Top-level component
        │   ├── app.store.js        # Redux store configuration
        │   └── AppRoutes.jsx       # Route definitions (/, /login, /register)
        │
        └── features/
            ├── auth/               # Authentication feature slice
            │   ├── auth.slice.js
            │   ├── components/
            │   │   ├── FormGroup.jsx
            │   │   └── Protected.jsx   # Route guard
            │   ├── hooks/
            │   │   └── useAuth.js
            │   ├── pages/
            │   │   ├── Login.jsx
            │   │   └── Register.jsx
            │   ├── service/
            │   │   └── auth.api.js
            │   └── style/
            │       └── form.scss
            │
            ├── chat/               # Chat feature slice
            │   ├── chatSlice.js    # Redux chat state
            │   ├── hooks/
            │   │   └── useChat.js      # Chat business logic hook
            │   ├── pages/
            │   │   └── Dashboard.jsx   # Main chat UI
            │   ├── service/
            │   │   ├── chat.api.js     # Axios API calls
            │   │   └── chat.socket.js  # Socket.io client
            │   └── styles/
            │       └── Chat.scss
            │
            └── shared/             # Global design system
                ├── button.scss     # Reusable button styles
                └── global.scss     # CSS custom properties + resets
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- A **MongoDB Atlas** cluster (free tier works)
- A **Mistral AI** API key — [get one here](https://console.mistral.ai/)
- A **Tavily** API key — [get one here](https://app.tavily.com/)
- A **Gmail** account with OAuth2 credentials — [Google Cloud Console](https://console.cloud.google.com/)

---

### 1. Clone the repository

```bash
git clone https://github.com/Adarsh8763/Backend_Cohort2.0.git
cd Backend_Cohort2.0/perplexity_backend_120
```

---

### 2. Set up the Backend

```bash
cd Backend
npm install
```

Copy `.env.example` and rename it to `.env`, then fill in your credentials.

```bash
npm run dev
# Server starts on http://localhost:3000
```

---

### 3. Set up the Frontend

```bash
cd ../Frontend
npm install
npm run dev
# App available at http://localhost:5173
```

---

### 4. (Optional) Build and serve everything from Express

For a production-like setup where Express serves the frontend:

```bash
cd Frontend
npm run build

# Copy the dist output into Backend/public/
# Windows:
xcopy /E /I dist ..\Backend\public\

# macOS / Linux:
cp -r dist/* ../Backend/public/
```

Then run only the backend — it will serve the frontend at the wildcard route.

---

## 🔐 Environment Variables

Create a `.env` file in the `Backend/` directory:

| Variable | Description | Example |
|---|---|---|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/Perplexity` |
| `JWT_SECRET` | Random 256-bit hex string for signing JWTs | `57fe265ebc6c8b51...` |
| `MISTRAL_API_KEY` | Mistral AI API key | `EPjzI8a0cV1V0K4w...` |
| `TAVILY_API_KEY` | Tavily Search API key | `tvly-dev-xxxx...` |
| `GOOGLE_USER` | Gmail address used to send emails | `you@gmail.com` |
| `GOOGLE_CLIENT_ID` | Google OAuth2 Client ID | `492017568861-xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth2 Client Secret | `GOCSPX-xxx` |
| `GOOGLE_REFRESH_TOKEN` | OAuth2 Refresh Token from Google Playground | `1//04xxx` |
| `REDIS_HOST` | Redis host (optional — for token blacklisting) | `redis-xxxxx.ec2.cloud.redislabs.com` |
| `REDIS_PORT` | Redis port | `13964` |
| `REDIS_PASSWORD` | Redis authentication password | `kjoFmxxx` |

> [!CAUTION]
> Never commit your `.env` file. It is already in `.gitignore`. Rotate all secrets immediately if they are accidentally exposed.

> [!TIP]
> Generate a strong `JWT_SECRET` instantly: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## 🎮 Usage

### Registering an Account

1. Navigate to `/register`
2. Enter a unique username, a valid email, and a password that has at least 6 characters, one uppercase letter, and one digit
3. Check your inbox for a verification email and click the confirmation link
4. Once verified, head to `/login`

### Starting a Conversation

1. After login, you land on the **Dashboard** (`/`)
2. The welcome screen shows suggestion pills — click any to pre-fill the input
3. Type your question and press **Enter** (or **Shift+Enter** for a new line)
4. The AI responds, and for new conversations, it also generates a chat title automatically
5. All conversations appear in the left sidebar — click any to resume it

### Managing Chats

- Click **+ New chat** in the sidebar header to start fresh
- Click the trash icon on any sidebar item to permanently delete that chat and all its messages
- On mobile, tap the hamburger menu (top-left) to open the sidebar; tap the backdrop to dismiss it

---

## 🔄 Workflow

Here is exactly what happens between the moment a user submits a message and when they see a response:

```
1. User presses Enter
        │
        ▼
2. Frontend dispatches setLoading(true) → "thinking" dots appear in the chat
        │
        ▼
3. Axios POST /api/chats/message  { message, chatId? }
        │
        ▼
4. identifyUser middleware reads JWT from cookie → injects req.user
        │
        ▼
5. [If chatId is null — new conversation]
        │   AI generates a 2–4 word title → chatModel.create({ user, title })
        │
        ▼
6. User message saved: messageModel.create({ role: "user", content })
        │
        ▼
7. Full message history for this chat fetched from DB → passed to agent
        │
        ▼
8. LangChain Agent receives message history + system prompt
        │
        ├─ Agent reasons: "Does this need live data?"
        │
        ├─ YES → searchInternetTool called → Tavily returns up to 5 results
        │                                         │
        │                                    Agent synthesizes an answer
        │
        └─ NO  → Model answers from its own knowledge
        │
        ▼
9. AI response saved: messageModel.create({ role: "ai", content })
        │
        ▼
10. Response JSON returned to frontend { aiMessage, result, chat }
        │
        ▼
11. Redux store updated: addNewMessage dispatched
        │
        ▼
12. react-markdown renders the AI response with full GFM support
        │
        ▼
13. Page auto-scrolls smoothly to the latest message
```

---

## 📡 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Access | Body / Query | Description |
|---|---|---|---|---|
| `POST` | `/register` | Public | `{ username, email, password }` | Register a new user; sends a verification email |
| `POST` | `/login` | Public | `{ email, password }` | Authenticate; sets a `token` HttpOnly cookie |
| `GET` | `/get-me` | Private 🔒 | — | Returns the authenticated user's profile |
| `POST` | `/logout` | Private 🔒 | — | Clears the `token` cookie |
| `GET` | `/verify-email` | Public | `?token=<jwt>` | Verifies email address using the signed link |
| `POST` | `/resend-verification-email` | Public | `{ email }` | Resends the verification email |

### Chat — `/api/chats`

| Method | Endpoint | Access | Body / Params | Description |
|---|---|---|---|---|
| `POST` | `/message` | Private 🔒 | `{ message, chatId? }` | Send a message; receive an AI response. Creates a new chat if `chatId` is omitted. |
| `GET` | `/` | Private 🔒 | — | List all chats belonging to the authenticated user |
| `GET` | `/:chatId/messages` | Private 🔒 | `:chatId` | Fetch all messages for a specific chat |
| `DELETE` | `/delete/:chatId` | Private 🔒 | `:chatId` | Delete a chat and cascade-delete all its messages |

> [!NOTE]
> All private routes require a valid `token` cookie set at login. Include `withCredentials: true` in every Axios request.

---

## 🖼 Screenshots

### 📝 Register Page

<p align="center">
  <img src="./assets/register.png" alt="Register Page" width="100%" />
</p>

---

### 🔐 Login Page

<p align="center">
  <img src="./assets/login.png" alt="Login Page" width="100%" />
</p>

---

### 🏠 Home Page

<p align="center">
  <img src="./assets/home.png" alt="Home Page" width="100%" />
</p>

---

### 💬 Chat Interface

<p align="center">
  <img src="./assets/chat.png" alt="Chat Interface" width="100%" />
</p>

---

## ⚡ Performance

- **Vite 7** delivers sub-second HMR in development and produces tree-shaken production bundles with automatic code splitting
- **Redux normalization** — chats are stored as a keyed object `{ [chatId]: chat }` for O(1) lookups instead of linear array scanning
- **Auto-resize textarea** uses `scrollHeight` directly, avoiding layout thrash and skipping any third-party resize libraries
- **`scrollIntoView({ behavior: "smooth" })`** with `useRef` — no scroll jank and no additional scroll libraries required
- **Express 5** ships with built-in async error handling, removing the need for `try/catch` wrappers inside every route handler
- **MongoDB Atlas** enforces `unique: true` on `username` and `email` at the schema level — collisions are caught at the DB layer, not just application logic
- **Single Render dyno** — the frontend is compiled and served as a static bundle from Express's `public/` directory, eliminating the need for a separate hosting service and simplifying CORS

---

## 🔒 Security

| Layer | Mechanism |
|---|---|
| **Password storage** | `bcryptjs` with salt rounds = 10 — passwords are never stored or logged in plaintext |
| **Authentication** | Stateless JWTs signed with a 256-bit secret, delivered via cookies |
| **Token expiry** | Auth tokens expire in 10 days; email verification tokens are single-use |
| **Email verification** | Users cannot log in until they click the signed email link — prevents fake account enumeration |
| **Input validation** | `express-validator` enforces field types, email format, and password complexity before any controller logic runs |
| **CORS policy** | `origin` is locked to the production frontend URL — no wildcard origins permitted |
| **Token blacklisting** | Redis infrastructure is fully in place; the logout blacklist is one line away from being enabled |
| **Route protection** | All chat endpoints sit behind the `identifyUser` middleware — unauthenticated requests are rejected at 401 |
| **Secrets management** | All API keys, DB URIs, and JWT secrets live in `.env` and are excluded from version control via `.gitignore` |

> [!WARNING]
> If you forked this repository and it contains a `.env` with real credentials, rotate all secrets immediately and remove the file from your git history using `git filter-repo` or BFG Repo Cleaner.

---

## 🔮 Future Improvements

These are the architectural enhancements that would take Vasuk AI from a solid prototype to a production-scale product:

- **Streaming responses** — Socket.io is already initialized; emit LangChain token chunks to the client instead of waiting for the full response string
- **Token blacklisting on logout** — One uncommented line in the logout controller enables Redis-backed JWT invalidation
- **Rate limiting** — Add `express-rate-limit` to `/api/auth` endpoints to stop brute-force attacks
- **Refresh token rotation** — Replace the single long-lived JWT with a short-lived access token paired with a rotating refresh token stored in Redis
- **Citation cards** — Surface Tavily's `url` and `title` metadata as inline, clickable source citations beneath AI responses
- **Message pagination** — Lazy-load older messages on scroll instead of fetching the entire chat history at once
- **User profile settings** — Allow users to change username, email, and password
- **Multi-model selector** — Let users pick between Mistral, Gemini, and GPT-4o from the UI
- **Chat export** — Download any conversation as a Markdown or PDF file
- **Accessibility** — ARIA live regions so screen readers announce incoming AI responses

---

## 🗺 Roadmap

- [x] User authentication (register, login, logout)
- [x] Email verification flow
- [x] Persistent chat sessions (MongoDB)
- [x] LangChain agent with Tavily web search
- [x] Auto-generated chat titles
- [x] GitHub-Flavored Markdown rendering
- [x] Sidebar with full chat history management
- [x] Socket.io server initialization
- [x] Deployed to Render
- [ ] Streaming token-by-token responses via Socket.io
- [ ] Redis token blacklist activated on logout
- [ ] Rate limiting on auth routes
- [ ] Tavily citation cards in responses
- [ ] Message pagination and infinite scroll
- [ ] Dark / light theme toggle
- [ ] Multi-model selector (Mistral, Gemini, GPT)
- [ ] PWA support — offline shell, installable
- [ ] Unit and integration test coverage

---

## 🤝 Contributing

Contributions are what make open-source worth building. Any improvement — big or small — is welcome.

1. **Fork** the repository
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/streaming-responses
   ```
3. **Commit your changes** with a clear message:
   ```bash
   git commit -m "feat: add token streaming via Socket.io"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/streaming-responses
   ```
5. **Open a Pull Request** — describe what you changed and why

### Code Style Guidelines

- Use ESM modules (`import`/`export`) throughout — no `require()`
- Prefer `async`/`await` over `.then()` chains
- Keep route handlers thin; push logic into controllers and services
- One feature or bug fix per PR — keep diffs reviewable
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages

---

## 📄 License

Distributed under the **ISC License**. See [`LICENSE`](LICENSE) for more information.

---

## 👨‍💻 Author

**Adarsh**

- GitHub: [@Adarsh8763](https://github.com/Adarsh8763)
- Email: [adarshkamal8763@gmail.com](mailto:adarshkamal8763@gmail.com)

---

## 🙏 Acknowledgements

- [**Mistral AI**](https://mistral.ai/) — for building a powerful, accessible, and genuinely fast language model
- [**LangChain**](https://js.langchain.com/) — for making LLM agent development ergonomic in JavaScript
- [**Tavily**](https://tavily.com/) — for a search API designed specifically for LLM agents
- [**MongoDB Atlas**](https://www.mongodb.com/atlas) — for the generous free-tier cloud database
- [**Render**](https://render.com/) — for effortless, zero-config Node.js deployment
- [**Vite**](https://vitejs.dev/) — for the fastest frontend tooling in the ecosystem
- [**Shields.io**](https://shields.io/) — for the README badges
- [**Capsule Render**](https://github.com/kyechan99/capsule-render) — for the animated banner

---

## 💬 Support

Have a question, found a bug, or want to suggest something?

- 🐛 [Open a bug report](../../issues/new)
- 💡 [Request a feature](../../issues/new)
- 📧 Email: [adarshkamal8763@gmail.com](mailto:adarshkamal8763@gmail.com)

---

## ⭐ Star the Repository

If Vasuk AI saved you time, sparked an idea, or you just think it's cool — consider starring the repository. It takes one second, and it genuinely helps others discover the project.

<div align="center">

**[⭐ Star this repo](../../stargazers)** — it means a lot.

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1E40AF,100:3B82F6&height=100&section=footer" alt="Footer" width="100%"/>

<br/>

*Built with curiosity, caffeine, and a genuine belief that AI should be useful — not just impressive.*

**Vasuk AI** · ISC License · Made with ❤️ by [Adarsh](https://github.com/Adarsh8763)

</div>
