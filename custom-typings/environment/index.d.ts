//declare let globalEnvironment: String;

declare module 'environment' {
  export interface IEnvironment {
   readonly isDevelopment: boolean;
   readonly isProduction: boolean;
  }
}
