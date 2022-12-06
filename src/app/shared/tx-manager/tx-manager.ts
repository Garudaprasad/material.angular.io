import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

/**
 * Class for managing languages. Language Files are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable()
export class TxManager {
  constructor(private readonly _translate: TranslateService) {}

  /**
   * Set the app language with the specified key.
   */
  setLang(key: string) {
    this._translate.use(key);
  }
}
