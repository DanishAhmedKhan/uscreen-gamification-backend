export {};

declare global {
   namespace NodeJS {
      interface ProcessEnv {
         APP_MODE: string;
         DB_URL_PRODUCTION: string;
         DB_URL_DEVELOPMENT: string;
         JWT_SECRET_KEY: string;
      }
   }
}
