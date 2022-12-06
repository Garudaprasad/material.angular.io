import { EventEmitter, Injectable } from "@angular/core";

export interface LanguageObject {
  name: string;
  isDefault?: boolean;
}

@Injectable()
export class LangStorage {
  static storageKey = "lang-storage-current-name";

  public onLanguageUpdate: EventEmitter<LanguageObject> =
    new EventEmitter<LanguageObject>();

  public storeLanguage(lang: LanguageObject) {
    try {
      window.localStorage[LangStorage.storageKey] = lang.name;
    } catch {}

    this.onLanguageUpdate.emit(lang);
  }

  public getStoredLanguage(): string | null {
    try {
      return window.localStorage[LangStorage.storageKey] || null;
    } catch {
      return null;
    }
  }

  public clearStorage() {
    try {
      window.localStorage.removeItem(LangStorage.storageKey);
    } catch {}
  }
}
