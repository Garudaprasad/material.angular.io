import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

/**
 * Service responsible for setting the title that appears above the components and guide pages.
 */
@Injectable({ providedIn: "root" })
export class PageTitle {
  private _title = "";
  private _originalTitle = "NextGrade";

  public get CurrentTitle(): string {
    return this._title;
  }

  public set CurrentTitle(title: string) {
    this._title = title;
    if (title !== "") {
      title = `${this.CurrentTitle} | NextGrade`;
    } else {
      title = this._originalTitle;
    }
    this._bodyTitle.setTitle(title);
  }

  constructor(private _bodyTitle: Title) {}
}
