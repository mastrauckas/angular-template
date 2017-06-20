import { Component, ViewEncapsulation  } from '@angular/core';
import EnvironmentService from '../services/environmentService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    providers: [EnvironmentService]
})
export class AppComponent {
  constructor(environmentService: EnvironmentService) {
    this.environmentService = environmentService;
    this.title = `Angular Template Application in environment ${this.showEnvironment()}`;
  }

  showEnvironment(): String {
    return this.environmentService.isDevelopment ? 'Development' : 'Production';
  }

  title: String;
  environmentService: EnvironmentService;
}
