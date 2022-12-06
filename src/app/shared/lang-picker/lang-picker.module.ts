import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslateModule } from "@ngx-translate/core";
import { TxManager } from "../tx-manager";
import { LangPickerComponent } from "./lang-picker.component";
import { LangStorage } from "./lang-storage/lang-storage";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    TranslateModule,
  ],
  exports: [LangPickerComponent],
  declarations: [LangPickerComponent],
  providers: [LangStorage, TxManager],
})
export class LangPickerModule {}
