import { TestAngularTemplateHomePage } from './app.po';

describe('test-angular App', () => {
  let page: TestAngularTemplateHomePage;

  beforeEach(() => {
    page = new TestAngularTemplateHomePage();
  });

  it('should display h1 welcome message', () => {
    page.navigateTo();
    expect(page.getH1WelcomeText()).toEqual('Welcome to the Angular 4 without the CLI!!');
  });

  it('should display h3 hello world message', () => {
    page.navigateTo();
    expect(page.getH3HelloWorldText()).toEqual('Welcome to Hello World Component in environment Development!!');
  });


});
