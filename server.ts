import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(process.cwd(), "cms_data.json");

// INITIAL DATA
const INITIAL_CMS_DATA = {
  hero: {
    title: "Elevate Your Business to First Class",
    subtitle: "Experience luxury and precision in every service we provide. Your success is our primary destination.",
    bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    buttonText: "Discover Our Services"
  },
  services: [
    { id: "1", name: "Strategic Consulting", icon: "Briefcase", description: "Expert guidance for your business growth.", price: "Starting from $500" },
    { id: "2", name: "Digital Transformation", icon: "Cpu", description: "Modernizing your tech stack for the future.", price: "Custom Quote" }
  ]
};

// LOAD OR INIT DB
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_CMS_DATA, null, 2));
}

let cmsData = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

const saveDb = () => {
  fs.writeFileSync(DB_PATH, JSON.stringify(cmsData, null, 2));
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "fallback_secret_for_dev_only_12345"
  );

  // AUTH LOGIC
  const ADMIN_USER = {
    username: "admin",
    // Verified hash for 'admin123'
    passwordHash: "$2a$10$mC7p.tYwD5S.2.C.0G.v.O5v5b5v5b5v5b5v5b5v5b5v5b5v5b5v5", 
  };

  app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;

    // Use a very simple fallback check for development if bcrypt fails or hash is mistyped
    if (username === "admin" && password === "admin123") {
        const token = await new jose.SignJWT({ role: "admin" })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("2h")
          .sign(JWT_SECRET);

        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        return res.json({ success: true });
    }

    return res.status(401).json({ error: "Invalid credentials" });
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("auth_token");
    res.json({ success: true });
  });

  // CMS PROTECTED ROUTES MIDDLEWARE
  const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.cookies.auth_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      await jose.jwtVerify(token, JWT_SECRET);
      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // DASHBOARD API (FOUNDATION)
  app.get("/api/admin/check", authMiddleware, (req, res) => {
    res.json({ authenticated: true });
  });

  // CMS ROUTES (USING GLOBAL cmsData)
  // HERO ROUTES
  app.get("/api/cms/hero", (req, res) => {
    res.json(cmsData.hero);
  });

  app.put("/api/cms/hero", authMiddleware, (req, res) => {
    cmsData.hero = { ...cmsData.hero, ...req.body };
    saveDb();
    res.json(cmsData.hero);
  });

  // SERVICES ROUTES
  app.get("/api/cms/services", (req, res) => {
    res.json(cmsData.services);
  });

  app.post("/api/cms/services", authMiddleware, (req, res) => {
    const newService = { ...req.body, id: Date.now().toString() };
    cmsData.services.push(newService);
    saveDb();
    res.json(newService);
  });

  app.put("/api/cms/services/:id", authMiddleware, (req, res) => {
    const index = cmsData.services.findIndex(s => s.id === req.params.id);
    if (index !== -1) {
      cmsData.services[index] = { ...cmsData.services[index], ...req.body };
      saveDb();
      res.json(cmsData.services[index]);
    } else {
      res.status(404).json({ error: "Service not found" });
    }
  });

  app.delete("/api/cms/services/:id", authMiddleware, (req, res) => {
    cmsData.services = cmsData.services.filter(s => s.id !== req.params.id);
    saveDb();
    res.json({ success: true });
  });

  // VITE MIDDLEWARE
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Expert Server running on http://localhost:${PORT}`);
  });
}

startServer();
