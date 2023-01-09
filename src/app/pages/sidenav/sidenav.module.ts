import { CdkAccordionModule } from "@angular/cdk/accordion";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule, Routes } from "@angular/router";
import { NavManager } from "src/app/shared/nav-manager/nav-manager";
import { FooterModule } from "src/app/shared/footer/footer";
import { NavigationFocusModule } from "src/app/shared/navigation-focus/navigation-focus";
import { SvgViewerModule } from "src/app/shared/svg-viewer/svg-viewer";
import {
  CategoryList,
  ComponentCategoryListModule,
} from "../category-list/category-list";
import { ComponentHeaderModule } from "../page-header/page-header";
import { ContentComponent } from "../content/content";
import { Nav } from "./nav";
import { Sidenav } from "./sidenav";
import { TranslateModule } from "@ngx-translate/core";
import { SidenavResolver } from "./sidenav.resolver";

const routes: Routes = [
  {
    path: "",
    component: Sidenav,
    children: [
      {
        path: "categories",
        children: [
          { path: "", component: CategoryList },
          {
            path: ":subSection",
            component: CategoryList,
            resolve: {
              navItems: SidenavResolver,
            },
          },
        ],
      },
      {
        path: ":id",
        component: ContentComponent,
        resolve: {
          navItems: SidenavResolver,
        },
      },
      { path: "**", redirectTo: "/404" },
    ],
  },
];

@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    CommonModule,
    ComponentCategoryListModule,
    ComponentHeaderModule,
    FooterModule,
    FormsModule,
    HttpClientModule,
    CdkAccordionModule,
    MatIconModule,
    SvgViewerModule,
    RouterModule.forChild(routes),
    NavigationFocusModule,
    TranslateModule,
  ],
  exports: [Sidenav],
  declarations: [Sidenav, Nav],
  providers: [NavManager, SidenavResolver],
})
export class ComponentSidenavModule {}
