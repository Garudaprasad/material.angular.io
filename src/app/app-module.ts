import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ErrorHandler, NgModule } from "@angular/core";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MaterialDocsApp } from "./material-docs-app";
import { MATERIAL_DOCS_ROUTES } from "./routes";
import { NavBarModule } from "./shared/navbar";
import { CookiePopupModule } from "./shared/cookie-popup/cookie-popup-module";
import { AnalyticsErrorReportHandler } from "./shared/analytics/error-report-handler";
import { HttpLoaderFactory } from "./app.module.loader";
import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

const prefersReducedMotion =
  typeof matchMedia === "function"
    ? matchMedia("(prefers-reduced-motion)").matches
    : false;

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule.withConfig({
      disableAnimations: prefersReducedMotion,
    }),
    RouterModule.forRoot(MATERIAL_DOCS_ROUTES, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NavBarModule,
    CookiePopupModule,
  ],
  declarations: [MaterialDocsApp],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: ErrorHandler, useClass: AnalyticsErrorReportHandler },
  ],
  bootstrap: [MaterialDocsApp],
})
export class AppModule {}
