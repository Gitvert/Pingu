import {autoinject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@autoinject
export class Page {

  constructor(private mRouter: Router) {}

  public async pinguClicked() {
    this.mRouter.navigate("/overview");
  }

  public async overviewClicked() {
    this.mRouter.navigate("/overview");
  }

  public async reportResultClicked() {
    this.mRouter.navigate("/report-result");
  }

  public async matchHistoryClicked() {
    this.mRouter.navigate("/match-history");
  }
}
