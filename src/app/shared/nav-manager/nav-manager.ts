import { Injectable, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subject, Subscription } from "rxjs";
import { PageTitle } from "src/app/shared/page-title/page-title";

const CONVERSIONS = "conversions";
const DE_CONVERSIONS = "de_conversions";
const CLIENTS_PROJS = "clients_projs";

export interface MainMenu {
  name: string;
  summary: string;
}

export const SECTIONS: { [key: string]: MainMenu } = {
  [CONVERSIONS]: {
    name: CONVERSIONS,
    summary: "",
  },
  [DE_CONVERSIONS]: {
    name: DE_CONVERSIONS,
    summary: "",
  },
  [CLIENTS_PROJS]: {
    name: CLIENTS_PROJS,
    summary: "",
  },
};

export interface MenuItem {
  /** Id of the doc item. Used in the URL for linking to the doc. */
  id: string;
  items?: MenuItem[];
}

const NAV_ITEMS_BY_SECTIONS: { [key: string]: MenuItem[] } = {
  [CONVERSIONS]: [
    {
      id: "advanced_directives",
    },
    {
      id: "allergies",
    },
    {
      id: "appt_recalls",
    },
    {
      id: "appts",
    },
    {
      id: "balance_forward",
    },
    {
      id: "bh",
      items: [
        {
          id: "bh_programs",
        },
        {
          id: "bh_goals_obj",
        },
        {
          id: "bh_person_support_role",
        },
        {
          id: "bh_provider_support_role",
        },
        {
          id: "bh_support_resources",
        },
      ],
    },
    {
      id: "demographics",
    },
    {
      id: "documents",
    },
    {
      id: "drivers_license",
    },
    {
      id: "epm",
      items: [
        {
          id: "epm_alerts",
        },
        {
          id: "epm_notes",
        },
      ],
    },
    {
      id: "hx",
      items: [
        {
          id: "hx_family",
        },
        {
          id: "hx_med_surg",
        },
        {
          id: "hx_social",
        },
      ],
    },

    {
      id: "ics_images",
    },
    {
      id: "ehr_images",
    },
    {
      id: "immunizations",
    },
    {
      id: "insurance",
    },
    {
      id: "insurance_card",
    },
    {
      id: "labs",
    },
    {
      id: "medications",
    },
    {
      id: "midmark",
    },
    {
      id: "problems",
    },
    {
      id: "problems_snomed",
    },
    {
      id: "procedures",
    },
    {
      id: "sticky_notes",
    },
    {
      id: "telephone_template",
    },
    {
      id: "template_notes",
    },
    {
      id: "vitals",
    },
  ],
  [DE_CONVERSIONS]: [
    {
      id: "demographics",
      items: [
        {
          id: "demographics",
        },
      ],
    },
    {
      id: "epm",
      items: [
        {
          id: "insurance",
        },
        {
          id: "appts",
        },
        {
          id: "epm_alerts",
        },
        {
          id: "epm_notes",
        },
      ],
    },
    {
      id: "ehr",
      items: [
        {
          id: "medications",
        },
        {
          id: "procedures",
        },
        {
          id: "allergies",
        },
        {
          id: "documents",
        },
        {
          id: "problems",
        },
        {
          id: "problems_snomed",
        },
        {
          id: "immunizations",
        },
        {
          id: "problems_chronics",
        },
        {
          id: "vitals",
        },
      ],
    },
    {
      id: "hx",
      items: [
        {
          id: "hx_general",
        },
        {
          id: "hx_med_surg_interim",
        },
        {
          id: "hx_diagnostic",
        },
        {
          id: "hx_family",
        },
        {
          id: "hx_social",
        },
        {
          id: "hx_tobacco",
        },
        {
          id: "hx_incarceration",
        },
        {
          id: "hx_employment",
        },
        {
          id: "hx_guardian",
        },
        {
          id: "hx_cultural",
        },
      ],
    },
    {
      id: "ics",
      items: [
        {
          id: "ics_images",
        },
      ],
    },
    {
      id: "other",
      items: [
        {
          id: "ehr_images",
        },
      ],
    },
  ],
};

@Injectable()
export class NavManager implements OnDestroy {
  public static urlParamsChanged: Subject<string> = new Subject<string>();

  private static _currentSection: string | undefined;
  private static _currentSubSection: string | undefined;
  private static _currentID: string | undefined;
  private _subscriptions$: Subscription = new Subscription();

  public get Section(): string | undefined {
    return NavManager._currentSection;
  }

  public set Section(value: string | undefined) {
    NavManager._currentSection = value;
    NavManager._currentSubSection = undefined;
    NavManager._currentID = undefined;
    NavManager.urlParamsChanged.next(value);
  }

  public get SubSection(): string | undefined {
    return NavManager._currentSubSection;
  }

  public set SubSection(value: string | undefined) {
    NavManager._currentSubSection = value;
    NavManager._currentID = undefined;
    NavManager.urlParamsChanged.next(value);
  }

  public set ID(value: string | undefined) {
    if (this.checkSubsection()) {
      this.SubSection = value;
    } else {
      NavManager._currentID = value;
      NavManager.urlParamsChanged.next(value);
    }
  }

  constructor(
    private _pageTitle: PageTitle,
    private _router: Router,
    private _tx: TranslateService
  ) {
    console.log("qweqweqwe");
    this._subscriptions$.add(
      NavManager.urlParamsChanged.subscribe((x) => {
        this.updateTitle();
      })
    );

    this._subscriptions$.add(
      _router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          const section = this.checkSection();
          if (!!section) {
            this.Section = section;
          }
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions$.unsubscribe();
    this.Section = undefined;
  }

  private checkSubsection() {
    const urlTree = this._router.url.split("/");
    return urlTree[urlTree.length - 2] === "categories";
  }

  private checkSection() {
    const urlTree = this._router.url.split("/");

    return urlTree[urlTree.length - 1] === "categories" && urlTree.length > 1
      ? urlTree[urlTree.length - 2]
      : null;
  }

  private updateTitle() {
    const key =
      NavManager._currentID ??
      NavManager._currentSubSection ??
      NavManager._currentSection ??
      "no-title";
    this._pageTitle.CurrentTitle =
      this._tx.instant("app.top-nav.menu.name." + key) !==
      "app.top-nav.menu.name." + key
        ? this._tx.instant("app.top-nav.menu.name." + key)
        : this._tx.instant("app.side-nav.name." + key);
  }

  public getNavItems(): Array<MenuItem> {
    return !!NavManager._currentSection &&
      !!NAV_ITEMS_BY_SECTIONS[NavManager._currentSection]
      ? NAV_ITEMS_BY_SECTIONS[NavManager._currentSection]
      : [];
  }

  public getCategoryItems(): MenuItem[] {
    return !!NavManager._currentSubSection
      ? this.getNavItems().find((x) => x.id === NavManager._currentSubSection)
          ?.items ?? []
      : this.getNavItems();
  }

  public getTopConversions(): string[] {
    const maxCount = 10;

    const letters = new Set<string>();
    for (let i = 0; i < maxCount; i++) {
      const random = Math.floor(
        Math.random() * NAV_ITEMS_BY_SECTIONS[CONVERSIONS].length
      );
      letters.add(NAV_ITEMS_BY_SECTIONS[CONVERSIONS][random].id);
    }

    return Array.from<string>(letters);
  }

  getItemById(id: string, section: string): MenuItem | undefined {
    return NAV_ITEMS_BY_SECTIONS[section].find((doc) => doc.id === id);
  }
}
