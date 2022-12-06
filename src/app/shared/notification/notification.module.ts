import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NotificationComponent } from "./notification.component";
import { TranslateModule } from "@ngx-translate/core";
import { NotificationManager } from "./notification-manager/notification-manager";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    TranslateModule,
    MatBadgeModule,
  ],
  exports: [NotificationComponent],
  declarations: [NotificationComponent],
  providers: [NotificationManager],
})
export class NotificationModule {}
