import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { LangStorage, LanguageObject } from "./lang-storage/lang-storage";
import { TxManager } from "./tx-manager/tx-manager";

@Component({
  selector: "lang-picker",
  templateUrl: "./lang-picker.component.html",
  styleUrls: ["./lang-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangPickerComponent {
  public languages: Array<LanguageObject> = [
    { name: "en", isDefault: true },
    { name: "fr" },
    { name: "de" },
  ];
  public currentLang: LanguageObject | undefined;

  private _queryParamSubscription = Subscription.EMPTY;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _storage: LangStorage,
    private readonly _liveAnnouncer: LiveAnnouncer,
    private readonly _translate: TxManager,
    private readonly _iconRegistry: MatIconRegistry,
    private readonly _sanitizer: DomSanitizer
  ) {
    this.languages.forEach((lang) => {
      this._iconRegistry.addSvgIcon(
        lang.name,
        this._sanitizer.bypassSecurityTrustResourceUrl(
          `assets/img/icons/svg/${lang.name}.svg`
        )
      );
    });

    const prevLang = this._storage.getStoredLanguage();
    if (prevLang) {
      this.selectLang(prevLang);
    } else {
      this.languages.find((themes) => {
        if (themes.isDefault === true) {
          this.selectLang(themes.name);
        }
      });
    }
  }

  public ngOnInit() {
    this._queryParamSubscription = this._activatedRoute.queryParamMap
      .pipe(map((params: ParamMap) => params.get("lang")))
      .subscribe((lang: string | null) => {
        if (lang) {
          this.selectLang(lang);
        }
      });
  }

  public selectLang(lang: string) {
    const theme = this.languages.find(
      (currentTheme) => currentTheme.name === lang
    );

    if (!theme) {
      return;
    }

    this.currentLang = theme;
    console.log(this.currentLang);

    this._translate.setLang(theme.name);

    if (this.currentLang) {
      this._liveAnnouncer.announce(
        `${theme.name} language selected.`,
        "polite",
        3000
      );
      this._storage.storeLanguage(this.currentLang);
    }
  }

  public ngOnDestroy() {
    this._queryParamSubscription.unsubscribe();
  }
}
