import { Component, NgModule, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { ThemePickerModule } from "../theme-picker";
import { VersionPickerModule } from "../version-picker";
import { SECTIONS } from "../documentation-items/documentation-items";
import { ThemeStorage } from "../theme-picker/theme-storage/theme-storage";
import { StyleManager } from "../style-manager";
import { HttpClientModule } from "@angular/common/http";
import { Subscription } from "rxjs";
import { NavigationFocusService } from "../navigation-focus/navigation-focus.service";
import { LangPickerModule } from "../lang-picker";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslateModule } from "@ngx-translate/core";

const SECTIONS_KEYS = Object.keys(SECTIONS);

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.html",
  styleUrls: ["./navbar.scss"],
})
export class NavBar implements OnDestroy {
  private subscriptions = new Subscription();
  isNextVersion = location.hostname.startsWith("next.material.angular.io");
  skipLinkHref: string | null | undefined;
  skipLinkHidden = true;

  constructor(private navigationFocusService: NavigationFocusService) {
    setTimeout(
      () => (this.skipLinkHref = this.navigationFocusService.getSkipLinkHref()),
      100
    );
  }

  get sections() {
    return SECTIONS;
  }

  get sectionKeys() {
    return SECTIONS_KEYS;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    ThemePickerModule,
    VersionPickerModule,
    LangPickerModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
  ],
  exports: [NavBar],
  declarations: [NavBar],
  providers: [StyleManager, ThemeStorage],
})
export class NavBarModule {}
