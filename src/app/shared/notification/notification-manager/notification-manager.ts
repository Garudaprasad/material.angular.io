import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

export interface INotificationObj {
  title: string;
  message: string;
  generatedDateTime: Date;
  highPriority: boolean;
}

@Injectable()
export class NotificationManager implements OnDestroy {
  public progress$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public allNotifications: Array<INotificationObj> = [{} as any];

  private _sbscr1: Subscription | undefined;

  //   constructor(private readonly _api: ApiService) {
  //     this._sbscr1 = ProgressService.registerForProgressOfUrl$(
  //       API_URL_SUFFIXES.NOTIFICATIONS_ALL
  //     ).subscribe((value) => {
  //       this.progress$.next(value);
  //     });

  //     this.getAllNotifications();
  //   }

  //   public getAllNotifications() {
  //     this._api.get(API_URL_SUFFIXES.NOTIFICATIONS_ALL).subscribe((data) => {
  //       this.allNotifications.splice(0, this.allNotifications.length);
  //       Array.prototype.push.apply(this.allNotifications, data);
  //     });
  //   }

  public ngOnDestroy(): void {
    this._sbscr1?.unsubscribe();
  }
}
