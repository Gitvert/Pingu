import {autoinject} from "aurelia-framework";
import {ServerProxy} from "../../serverProxy";
import {Router} from "aurelia-router";

@autoinject
export class CreatePlayer {
  public firstName: string;
  public lastName: string;

  constructor(private mRouter: Router) {}

  public async submitClicked(): Promise<void> {
    await ServerProxy.createPlayer(this.firstName + " " + this.lastName)
      .then(() => this.mRouter.navigate("/report-result"))
      .catch(() => alert("Failed to create player, maybe the name is already taken?"));
  }
}
