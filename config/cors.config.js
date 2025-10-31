import { envs } from "./envs.js";

// Parse CORS origins from env (split by comma and trim)
const allowedOrigins = envs.CORS_ORIGINS
  ? envs.CORS_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

// CORS options using environment variables
export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: envs.CORS_METHODS ? envs.CORS_METHODS.split(",") : ["GET", "POST"],
  credentials: "true", // Allow cookies/headers
  optionsSuccessStatus: 200, // Legacy browser support
};
