import { CdkAccordionModule } from "@angular/cdk/accordion";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule, Routes } from "@angular/router";
import { DocViewerModule } from "src/app/shared/doc-viewer/doc-viewer-module";
import { DocumentationItems } from "src/app/shared/documentation-items/documentation-items";
import { FooterModule } from "src/app/shared/footer/footer";
import { NavigationFocusModule } from "src/app/shared/navigation-focus/navigation-focus";
import { StackBlitzButtonModule } from "src/app/shared/stack-blitz";
import { SvgViewerModule } from "src/app/shared/svg-viewer/svg-viewer";
import {
  ComponentCategoryList,
  ComponentCategoryListModule,
} from "../component-category-list/component-category-list";
import { ComponentHeaderModule } from "../component-page-header/component-page-header";
import { ContentComponent } from "../content/content.component";
import { ComponentNav } from "./component-nav";
import { ComponentSidenav } from "./component-sidenav";

const routes: Routes = [
  {
    path: "",
    component: ComponentSidenav,
    children: [
      { path: "component/:id", redirectTo: ":id", pathMatch: "full" },
      {
        path: "category/:id",
        redirectTo: "/categories/:id",
        pathMatch: "full",
      },
      {
        path: "categories",
        children: [{ path: "", component: ComponentCategoryList }],
      },
      {
        path: ":id",
        component: ContentComponent,
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
    DocViewerModule,
    FooterModule,
    FormsModule,
    HttpClientModule,
    CdkAccordionModule,
    MatIconModule,
    StackBlitzButtonModule,
    SvgViewerModule,
    RouterModule.forChild(routes),
    NavigationFocusModule,
  ],
  exports: [ComponentSidenav],
  declarations: [ComponentSidenav, ComponentNav],
  providers: [DocumentationItems],
})
export class ComponentSidenavModule {}
