import { CommonModule } from "@angular/common";
import { Component, NgModule, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { DocItem, NavManager } from "../../shared/nav-manager/nav-manager";
import { NavigationFocusModule } from "../../shared/navigation-focus/navigation-focus";
import { SvgViewerModule } from "../../shared/svg-viewer/svg-viewer";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.html",
  styleUrls: ["./category-list.scss"],
})
export class CategoryList implements OnInit {
  public catItems: Array<DocItem> = new Array<DocItem>();

  constructor(public navMgr: NavManager) {}

  public ngOnInit(): void {
    this.catItems = this.navMgr.getCategoryItems();
    NavManager.subSectionChanged.subscribe((x) => {
      this.catItems = this.navMgr.getCategoryItems();
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    SvgViewerModule,
    MatCardModule,
    RouterModule,
    NavigationFocusModule,
    TranslateModule,
  ],
  exports: [CategoryList],
  declarations: [CategoryList],
  providers: [NavManager],
})
export class ComponentCategoryListModule {}
