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
export class PageHeader {
  constructor(private _pageTitle: PageTitle, private _tx: TranslateService) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle(): string {
    return this._pageTitle.CurrentTitle ?? "asdasdasd";
  }
}

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    NavigationFocusModule,
    TranslateModule,
  ],
  exports: [PageHeader],
  declarations: [PageHeader],
})
export class HeaderModule {}
