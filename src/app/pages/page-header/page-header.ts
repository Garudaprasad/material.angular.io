import { Component, EventEmitter, NgModule, Output } from "@angular/core";
import { PageTitle } from "../page-title/page-title";
import { NavigationFocusModule } from "../../shared/navigation-focus/navigation-focus";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "page-header",
  templateUrl: "./page-header.html",
  styleUrls: ["./page-header.scss"],
})
export class ComponentPageHeader {
  constructor(
    private _componentPageTitle: PageTitle,
    private _tx: TranslateService
  ) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle(): string {
    return this._tx.instant(
      "app.top-nav.menu.name." + this._componentPageTitle.title
    ) !==
      "app.top-nav.menu.name." + this._componentPageTitle.title
      ? this._tx.instant(
          "app.top-nav.menu.name." + this._componentPageTitle.title
        )
      : this._tx.instant("app.side-nav.name." + this._componentPageTitle.title);
  }
}

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    NavigationFocusModule,
    TranslateModule,
  ],
  exports: [ComponentPageHeader],
  declarations: [ComponentPageHeader],
})
export class ComponentHeaderModule {}
