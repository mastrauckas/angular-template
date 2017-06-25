import { TestBed, async, inject } from '@angular/core/testing';
import HelloWorldComponent from './helloWorld.component';
import EnvironmentService from '../../services/environmentService';

describe('HelloWorldComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelloWorldComponent],
      providers: [EnvironmentService]
    }).compileComponents();
  }));

  it('should create the HelloWorldComponent', async(() => {
    const fixture = TestBed.createComponent(HelloWorldComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have have correct title', async(() => {
    const fixture = TestBed.createComponent(HelloWorldComponent);
    const app = fixture.debugElement.componentInstance;
    async(inject([EnvironmentService], (service) => {
      expect(app.title)
        .toEqual(`Hello World Component in environment ${showEnvironment(service)}`);
    }));
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(HelloWorldComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    async(inject([EnvironmentService], (service) => {
      expect(compiled.querySelector('h3').textContent)
        .toEqual(`Welcome to Hello World Component in environment ${showEnvironment(service)}!!`);
    }));
  }));

  function showEnvironment(environmentService: EnvironmentService): String {
    return environmentService.isDevelopment ? 'Development' : 'Production';
  }
});
