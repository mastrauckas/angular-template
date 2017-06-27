import { browser, by, element } from 'protractor';

export class TestAngularTemplateHomePage {
  navigateTo() {
    return browser.get('/');
  }

  getH1WelcomeText() {
    return element(by.css('app-root div h1')).getText();
  }

  getH3HelloWorldText() {
    return element(by.css('app-root div h3')).getText();
  }
}
