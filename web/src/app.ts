import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/bootstrap.bundle');

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Pingu';
    config.options.pushState = false;
    config.options.root = '/';
    config.map([
      { route: '', redirect: 'overview' },
      { route: '/overview', moduleId: PLATFORM.moduleName('./pages/overview/overview'), title: 'Overview' },
      { route: '/report-result', moduleId: PLATFORM.moduleName('./pages/report-result/report-result'), title: 'Report result' },
      { route: '/match-history', moduleId: PLATFORM.moduleName('./pages/match-history/match-history'), title: 'Match history' },
      { route: '/create-player', moduleId: PLATFORM.moduleName('./pages/create-player/create-player'), title: 'Create player' },
    ]);

    this.router = router;
  }
}
