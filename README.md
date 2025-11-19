# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Backend API configuration (local)

The frontend expects a backend API running on port 8080 by default. You can override it with Vite env var in a `.env` file.

Create a `.env` file with:

```
VITE_API_BASE=http://localhost:8080
```

Then run the dev server:

```powershell
npm run dev
```

The app will call:
- POST `${VITE_API_BASE}/analises/upload` (multipart/form-data, fields: `image`/`imagem`, `dispositivo`)
- GET `${VITE_API_BASE}/analises`

If your backend uses different form keys, tell me and I can change the keys the frontend submits.
