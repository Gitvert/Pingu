import {autoinject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@autoinject
export class Page {

  constructor(private mRouter: Router) {}

  public async pinguClicked() {
    this.mRouter.navigate("/overview");
  }
}
