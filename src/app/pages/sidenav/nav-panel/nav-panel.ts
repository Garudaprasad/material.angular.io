import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { MenuItem, NavManager } from "src/app/shared/nav-manager/nav-manager";

@Component({
  selector: "nav-panel",
  templateUrl: "./nav-panel.html",
  animations: [
    trigger("bodyExpansion", [
      state("collapsed", style({ height: "0px", display: "none" })),
      state("expanded", style({ height: "*", display: "block" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4,0.0,0.2,1)")
      ),
    ]),
  ],
})
export class NavPanel implements OnInit {
  public currentItemId: string | undefined;
  public navItems: Array<MenuItem> = new Array<MenuItem>();

  constructor(public navMgr: NavManager) {}

  public ngOnInit(): void {
    this.navItems = this.navMgr.getNavItems();
    NavManager.urlParamsChanged.subscribe((x) => {
      this.navItems = this.navMgr.getNavItems();
    });
  }
}
