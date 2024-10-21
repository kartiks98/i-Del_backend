import { registerAs } from "@nestjs/config";

export default registerAs("misc", () => ({
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleSecretKey: process.env.GOOGLE_CLIENT_SECRET,
  apiHost: process.env.API_HOST,
  port: process.env.PORT,
}));
