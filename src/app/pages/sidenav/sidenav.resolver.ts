import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Resolve,
  Router,
} from "@angular/router";
import { NavManager } from "src/app/shared/nav-manager/nav-manager";

@Injectable({ providedIn: "root" })
export class SidenavResolver implements Resolve<boolean> {
  constructor(private _navMgr: NavManager) {}

  resolve(route: ActivatedRouteSnapshot): boolean {
    if (!!route.params?.id) {
      this._navMgr.ID = route.params?.id;
    }

    if (!!route.params?.subSection) {
      this._navMgr.SubSection = route.params?.subSection;
    }

    if (!!route.params?.section) {
      this._navMgr.Section = route.params?.section;
    }
    return true;
  }
}
