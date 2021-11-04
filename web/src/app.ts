import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/bootstrap.bundle');

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    console.log("TEST");
    config.title = 'Pingu';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', redirect: 'overview' },
      { route: '/overview', moduleId: PLATFORM.moduleName('./overview'), title: 'Overview' },
      { route: '/report-result', moduleId: PLATFORM.moduleName('./report-result'), title: 'Report result' },
      { route: '/match-history', moduleId: PLATFORM.moduleName('./match-history'), title: 'Match history' },
    ]);

    this.router = router;
  }
}
