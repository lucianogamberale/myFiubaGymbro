# myFiubaBro Frontend

## 📦 Devcontainer Ready

This project is set up to be used with [DevContainers](https://containers.dev/). You can open it directly in Visual Studio Code using the "Reopen in Container" option.

## 🚀 How to Run in Developer Mode

```bash
npm install
npm run dev
```

This will launch the development server using Vite. By default, it should be available at:

```
http://localhost:8080
```

## 🏁 How to Run (Production)

To build and serve the app in production mode:

```bash
npm install
npm run build
npx serve dist
```

## 🌐 How It Can Be Accessed from Outside

If running in a devcontainer, the port `8080` should be forwarded. In `.devcontainer/devcontainer.json`, ensure you have:

```json
"forwardPorts": [8080]
```

Access from your host machine at:

```
http://localhost:8080
```

## 📚 API Documentation

This frontend interfaces with the myFiubaBro backend API.

Make sure the backend is running and accessible (typically on port `8080`).

You can configure API endpoints by editing environment variables or by modifying the Axios base URL inside the frontend code.

## 🛠 Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **Radix UI**
- **NextAuth**
- **Zod**
- **Axios**

## 🧪 ESLint Setup

This project uses ESLint with TypeScript:

To enable type-aware lint rules in production:

- Modify `parserOptions` in `.eslintrc`:
  ```js
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  }
  ```

- Use the following plugins for stricter type checking:
  ```json
  "extends": [
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ]
  ```

---

For any issues, please check logs with:

```bash
npm run dev
```

and ensure Tailwind content configuration includes your `src` folder.