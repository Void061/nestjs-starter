export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}
