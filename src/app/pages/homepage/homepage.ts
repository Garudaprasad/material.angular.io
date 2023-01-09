import {
  AfterViewInit,
  Component,
  HostBinding,
  Inject,
  NgModule,
  OnInit,
  Optional,
  ViewChild,
} from "@angular/core";
import { ANIMATION_MODULE_TYPE } from "@angular/platform-browser/animations";
import { SvgViewerModule } from "../../shared/svg-viewer/svg-viewer";
import { MatButtonModule } from "@angular/material/button";
import { FooterModule } from "../../shared/footer/footer";
import { RouterModule, Routes } from "@angular/router";
import { NavigationFocusModule } from "../../shared/navigation-focus/navigation-focus";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { CarouselModule } from "../../shared/carousel/carousel-module";
import { Support } from "../../shared/support/support";
import { TranslateModule } from "@ngx-translate/core";
import Chart from "chart.js/auto";
import { NavManager } from "src/app/shared/nav-manager/nav-manager";
import {
  BAR_CHART,
  PIE_CHART,
  LINE_CHART,
  RADAR_CHART,
  POLAR_CHART,
  DONUT_CHART,
} from "./chart-data";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.html",
  styleUrls: ["./homepage.scss"],
})
export class Homepage implements AfterViewInit {
  @ViewChild("barCanvas", { static: true })
  public barCanvas!: { nativeElement: any };

  @ViewChild("pieCanvas", { static: true })
  public pieCanvas!: { nativeElement: any };

  @ViewChild("lineCanvas", { static: true })
  public lineCanvas!: { nativeElement: any };

  @ViewChild("radarCanvas", { static: true })
  public radarCanvas!: { nativeElement: any };

  @ViewChild("polarCanvas", { static: true })
  public polarCanvas!: { nativeElement: any };

  @ViewChild("donutCanvas", { static: true })
  public donutCanvas!: { nativeElement: any };

  @HostBinding("class.main-content") readonly mainContentClass = true;
  @HostBinding("class.animations-disabled")
  readonly animationsDisabled: boolean;

  public topConversions: Array<string> = [];

  constructor(
    private _navMgr: NavManager,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationsModule?: string
  ) {
    this.animationsDisabled = animationsModule === "NoopAnimations";
    this.topConversions = this._navMgr.getTopConversions();
  }

  ngAfterViewInit(): void {
    this.pieChartBrowser();
  }

  pieChartBrowser(): void {
    let barChart = new Chart(
      this.barCanvas.nativeElement.getContext("2d"),
      BAR_CHART
    );

    let pieChart = new Chart(
      this.pieCanvas.nativeElement.getContext("2d"),
      PIE_CHART
    );

    let lineChart = new Chart(
      this.lineCanvas.nativeElement.getContext("2d"),
      LINE_CHART
    );

    let radarChart = new Chart(
      this.radarCanvas.nativeElement.getContext("2d"),
      RADAR_CHART
    );

    let polarChart = new Chart(
      this.polarCanvas.nativeElement.getContext("2d"),
      POLAR_CHART
    );

    let donutChart = new Chart(
      this.donutCanvas.nativeElement.getContext("2d"),
      DONUT_CHART
    );
  }
}

const routes: Routes = [{ path: "", component: Homepage }];

@NgModule({
  imports: [
    SvgViewerModule,
    MatButtonModule,
    FooterModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NavigationFocusModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    CommonModule,
    CarouselModule,
  ],
  exports: [Homepage],
  declarations: [Homepage, Support],
  providers: [NavManager],
})
export class HomepageModule {}
