import {
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
import { ComponentPageTitle } from "../page-title/page-title";
import { NavigationFocusModule } from "../../shared/navigation-focus/navigation-focus";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { GuideItems } from "../../shared/guide-items/guide-items";
import { CommonModule } from "@angular/common";
import { CarouselModule } from "../../shared/carousel/carousel-module";
import { Support } from "../../shared/support/support";
import { TranslateModule } from "@ngx-translate/core";
import Chart from "chart.js/auto";

const TOP_COMPONENTS = [
  "datepicker",
  "input",
  "slide-toggle",
  "slider",
  "button",
];

export const BAR_CHART: any = {
  type: "bar",
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Predicted world population (millions) in 2050",
    },
  },
};

export const PIE_CHART: any = {
  type: "pie",
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Predicted world population (millions) in 2050",
    },
  },
};

export const LINE_CHART: any = {
  type: "line",
  data: {
    labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    datasets: [
      {
        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false,
      },
      {
        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
        label: "Asia",
        borderColor: "#8e5ea2",
        fill: false,
      },
      {
        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
        label: "Europe",
        borderColor: "#3cba9f",
        fill: false,
      },
      {
        data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
        label: "Latin America",
        borderColor: "#e8c3b9",
        fill: false,
      },
      {
        data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
        label: "North America",
        borderColor: "#c45850",
        fill: false,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "World population per region (in millions)",
    },
  },
};

export const RADAR_CHART: any = {
  type: "radar",
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "1950",
        fill: true,
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: [8.77, 55.61, 21.69, 6.62, 6.82],
      },
      {
        label: "2050",
        fill: true,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(255,99,132,1)",
        data: [25.48, 54.16, 7.61, 8.06, 4.45],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Distribution in % of world population",
    },
  },
};

export const POLAR_CHART: any = {
  type: "polarArea",
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Predicted world population (millions) in 2050",
    },
  },
};

export const DONUT_CHART: any = {
  type: "doughnut",
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Predicted world population (millions) in 2050",
    },
  },
};

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.html",
  styleUrls: ["./homepage.scss"],
})
export class Homepage implements OnInit {
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

  isNextVersion = location.hostname.startsWith("next.material.angular.io");

  constructor(
    public _componentPageTitle: ComponentPageTitle,
    public guideItems: GuideItems,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationsModule?: string
  ) {
    this.animationsDisabled = animationsModule === "NoopAnimations";
  }

  ngOnInit(): void {
    this._componentPageTitle.title = "";
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

  getTopComponents(): string[] {
    return TOP_COMPONENTS;
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
  providers: [GuideItems],
})
export class HomepageModule {}
