import { Component } from '@angular/core';
import EnvironmentService from '../../services/environmentService';

@Component({
  selector: 'app-hello-world',
  templateUrl: './helloWorld.component.html',
  styleUrls: ['./helloWorld.component.scss'],
  providers: [EnvironmentService]
})
export default class HelloWorldComponent {
  constructor(environmentService: EnvironmentService) {
    this.environmentService = environmentService;
    this.title = `Hello World Component in environment ${this.showEnvironment()}`;
  }

  showEnvironment(): String {
    return this.environmentService.isDevelopment ? 'Development' : 'Production';
  }

  title: String;
  environmentService: EnvironmentService;
}
