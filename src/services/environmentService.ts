// import { Injectable } from '@angular/core';
import { Environment } from '../interfaces/environment';
import { environmentName } from '../globals';

// @Injectable()
export default class EnvironmentService implements Environment {
  private environmentName: String = environmentName;

  get isDevelopment(): boolean {
    return this.environmentName === 'DEVELOPMENT';
  }

  get isProduction(): boolean {
    return this.environmentName === 'PRODUCTION';
  }
}
