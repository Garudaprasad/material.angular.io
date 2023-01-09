import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Resolve,
  Router,
} from "@angular/router";
import { NavManager } from "src/app/shared/nav-manager/nav-manager";
import { PageTitle } from "../page-title/page-title";

@Injectable({ providedIn: "root" })
export class SidenavResolver implements Resolve<boolean> {
  constructor(private _componentPageTitle: PageTitle, private _router: Router) {
    this.setSubsectionFromUrl(this._router.url);
    this._router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setSubsectionFromUrl(val.url);
      }
    });
  }

  resolve(route: ActivatedRouteSnapshot): boolean {
    if (!!route.params?.id) {
      this._componentPageTitle.title = route.params?.id;
      console.log('id', route.params?.id);
    }

    if (!!route.params?.section) {
      NavManager.setSection = route.params?.section;
      console.log('sectionStorage', localStorage.getItem(NavManager.sectionStorage));
    }
    return true;
  }

  setSubsectionFromUrl(url: string) {
    const urlTree = url.split("/");
    if (urlTree[urlTree.length - 2] === "categories") {
      NavManager.setSubSection = urlTree[urlTree.length - 1];
    } else {
      NavManager.setSubSection = "null";
    }
    console.log('subSectionStorage',localStorage.getItem(NavManager.subSectionStorage));
  }
}
