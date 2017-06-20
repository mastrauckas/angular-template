// import { Injectable } from '@angular/core';
import { IEnvironment } from 'environment';
import { environment } from '../globals';

// @Injectable()
export default class EnvironmentService implements IEnvironment  {
  private environmentName: String = environment;

  get isDevelopment(): boolean {
    return this.environmentName === 'DEVELOPMENT';
  }

  get isProduction(): boolean {
    return this.environmentName === 'PRODUCTION';
  }
}
