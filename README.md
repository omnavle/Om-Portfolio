# Om Navle — Portfolio

A premium, dark-green, Awwwards-style developer portfolio built with the MERN-adjacent
stack requested: React (Vite) + Tailwind + Framer Motion + GSAP + Lenis on the frontend,
and Express + Nodemailer on the backend. No database — all content lives in plain
JavaScript data files.

```
portfolio/
├── frontend/   React + Vite + Tailwind app
└── backend/    Express API (profile, projects, skills, contact form)
```

## 1. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env      # set VITE_API_URL if your backend runs elsewhere
npm run dev                # http://localhost:5173
```

Build for production with `npm run build` (outputs to `frontend/dist`).

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:

```
PORT=5000
CLIENT_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your.email@gmail.com
SMTP_PASS=your_app_password        # use a Gmail "App Password", not your login password
CONTACT_RECEIVER_EMAIL=omnavle.dev@gmail.com
```

If you don't configure SMTP credentials yet, the `/api/contact` endpoint still works —
it just logs the message to the server console instead of emailing it, so you can wire
up the frontend before setting up email delivery.

Run it:

```bash
npm run dev     # nodemon-free live reload via `node --watch`
# or
npm start       # http://localhost:5000
```

## 3. API reference

| Method | Route                  | Description                     |
| ------ | ----------------------- | -------------------------------- |
| GET    | `/api/health`           | Health check                     |
| GET    | `/api/profile`          | Hero/about content                |
| GET    | `/api/projects`         | All projects                     |
| GET    | `/api/projects/:id`     | Single project by id              |
| GET    | `/api/skills`           | Skill categories                  |
| GET    | `/api/experience`       | Work experience                   |
| GET    | `/api/education`        | Education                         |
| GET    | `/api/achievements`     | Achievements / publications       |
| POST   | `/api/contact`          | Contact form (rate-limited, validated, emailed via Nodemailer) |

## 4. Editing your content

Everything in the resume — name, roles, summary, skills, projects, experience,
education, achievements — lives in `frontend/src/data/*.js` (and is mirrored in
`backend/data/*.js` for the API). Edit those files directly; no CMS or database
required.

To swap in your real resume PDF and terminal social links, replace:
- `frontend/public/Om_Navle_Resume.pdf` (referenced by the "Download Resume" button)
- `socials` object inside `frontend/src/data/profile.js` and `backend/data/profile.js`

## 5. Deploying

- **Frontend**: deploy the `frontend/dist` build to Vercel, Netlify, or any static host.
- **Backend**: deploy `backend/` to Render, Railway, or any Node host; set the same
  environment variables from `.env.example` there, and point `VITE_API_URL` in the
  frontend at the deployed backend URL.

## Notes on design

- Colors, spacing, and section order follow the brief exactly (dark `#0A0F14` base,
  `#39E6B2` primary accent, glass cards, animated grid + noise + spotlight background).
- The hero terminal window is the page's signature moment — a live-typing `whoami`,
  `skills`, `experience`, and `projects` session that doubles as a compact resume.
- Motion is deliberate rather than decorative: page-load sequence, scroll reveals,
  a hide-on-scroll navbar, magnetic buttons, and tilting project cards — all respecting
  `prefers-reduced-motion`.
