import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    console.log("TEST");
    config.title = 'Pingu';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('overview'),   title: 'Overview' },
      { route: '/coolio', moduleId: PLATFORM.moduleName('coolio'),   title: 'Coolio' },
    ]);

    this.router = router;
  }
}
