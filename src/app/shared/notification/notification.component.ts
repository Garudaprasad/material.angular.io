import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  INotificationObj,
  NotificationManager,
} from "./notification-manager/notification-manager";

@Component({
  selector: "notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent {
  public get NotificationsAvailable(): boolean {
    return !!this.notifications && this.notifications.length > 0;
  }

  public progress$: BehaviorSubject<boolean> = this._service.progress$;
  public notifications: Array<INotificationObj> | undefined;

  constructor(private readonly _service: NotificationManager) {
    this.init();
  }

  private init() {
    this.notifications = this._service.allNotifications;
  }
}
