import { BreakpointObserver } from "@angular/cdk/layout";
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatSidenav, MatDrawerToggleResult } from "@angular/material/sidenav";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { NavigationFocusService } from "../../shared/navigation-focus/navigation-focus.service";

const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.html",
  styleUrls: ["./sidenav.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class Sidenav implements OnInit, OnDestroy {
  @ViewChild(MatSidenav)
  public sidenav!: MatSidenav;
  public isExtraScreenSmall: Observable<boolean>;
  public isScreenSmall: Observable<boolean>;

  private subscriptions = new Subscription();

  constructor(
    private readonly _navigationFocusService: NavigationFocusService,
    private readonly _breakpoints: BreakpointObserver
  ) {
    this.isExtraScreenSmall = this._breakpoints
      .observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map((breakpoint) => breakpoint.matches));
    this.isScreenSmall = this._breakpoints
      .observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map((breakpoint) => breakpoint.matches));
  }

  ngOnInit() {
    this.subscriptions.add(
      this._navigationFocusService.navigationEndEvents
        .pipe(map(() => this.isScreenSmall))
        .subscribe((shouldCloseSideNav) => {
          if (shouldCloseSideNav && this.sidenav) {
            this.sidenav.close();
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleSidenav(sidenav: MatSidenav): Promise<MatDrawerToggleResult> {
    return sidenav.toggle();
  }
}
