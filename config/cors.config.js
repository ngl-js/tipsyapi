import { envs } from "./envs.js";

export const corsOptions = {
  origin: `${envs.CORS_ORIGIN.split(",")}` || "*",
  optionsSuccessStatus: 200,
  methods: "GET,POST",
};

