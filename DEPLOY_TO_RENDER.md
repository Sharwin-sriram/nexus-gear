# 🚀 How to Deploy NEXUS GEAR to Render.com

This project is fully configured for [Render.com](https://render.com) and supports two easy deployment paths:

---

## ⚡ Option 1: Instant Static Site (Frontend UI only — 30 seconds, 100% Free)
Best if you need a quick, publicly accessible link for your assignment demo right away:

1. Push this folder to a GitHub repository (e.g. `https://github.com/your-username/nexus-gear`).
2. Log in to [dashboard.render.com](https://dashboard.render.com).
3. Click **"New +"** (top right) $\rightarrow$ Select **"Static Site"**.
4. Connect your GitHub repository.
5. In the configuration settings:
   - **Name**: `nexus-gear-ui`
   - **Branch**: `main`
   - **Build Command**: *(leave blank or type `echo "OK"`)*
   - **Publish Directory**: `public`
6. Click **"Create Static Site"**.
7. Render will build it and give you a live URL like:  
   👉 `https://nexus-gear-ui.onrender.com`

---

## 🛠️ Option 2: Full-Stack Deployment with PostgreSQL (via Render Blueprint)
Best for complete production deployment with the Spring Boot REST backend and managed PostgreSQL:

1. Push this project to GitHub.
2. In Render Dashboard, click **"New +"** $\rightarrow$ Select **"Blueprint"**.
3. Connect your repository.
4. Render will automatically detect the [`render.yaml`](./render.yaml) file in the root directory.
5. Click **"Apply"**.
6. Render will automatically spin up:
   - **PostgreSQL Database** (`nexus-gear-db`)
   - **Docker Web Service** (`nexus-gear-app` running Spring Boot + embedded frontend)
   - **Static Frontend** (`nexus-gear-static-ui`)
7. Once finished, visit your live app URL!

---

## 🐳 Option 3: Manual Docker Web Service
If you prefer creating the Web Service manually without a blueprint:

1. On Render, click **"New +"** $\rightarrow$ **"Web Service"**.
2. Connect your repo and choose **Docker** runtime.
3. Set **Dockerfile Path**: `./Dockerfile`.
4. Under **Environment Variables**, add:
   - `PORT`: `10000`
   - *(Optional)* `SPRING_DATASOURCE_URL`: your PostgreSQL connection string (if omitted, it runs with embedded database).
5. Click **"Create Web Service"**.

---

## 🧪 Testing Backend Endpoints Once Deployed:
- `GET /` $\rightarrow$ Interactive Storefront UI
- `GET /api/products` $\rightarrow$ JSON array of tech products
- `GET /api/products/categories` $\rightarrow$ List of product categories
- `POST /api/auth/register` $\rightarrow$ Create account
- `POST /api/auth/login` $\rightarrow$ Login user
- `POST /api/orders` $\rightarrow$ Place order & get tracking code
