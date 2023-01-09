import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PageTitle } from "src/app/pages/page-title/page-title";

const CONVERSIONS = "conversions";
const DE_CONVERSIONS = "de_conversions";

export interface DocSection {
  name: string;
  summary: string;
}

export const SECTIONS: { [key: string]: DocSection } = {
  [CONVERSIONS]: {
    name: CONVERSIONS,
    summary: "",
  },
  [DE_CONVERSIONS]: {
    name: DE_CONVERSIONS,
    summary: "",
  },
};

export interface DocItem {
  /** Id of the doc item. Used in the URL for linking to the doc. */
  id: string;
  items?: DocItem[];
}

const NAV_ITEMS_BY_SECTIONS: { [key: string]: DocItem[] } = {
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
export class NavManager {
  public static sectionStorage = "url-section";
  public static subSectionStorage = "url-sub-section";

  public static sectionChanged: Subject<string> = new Subject<string>();
  public static subSectionChanged: Subject<string> = new Subject<string>();
  public static idChanged: Subject<string> = new Subject<string>();

  public currentSection: string | undefined;
  public currentSubSection: string | undefined;
  private static currentID: string | undefined;

  private _navItems: Array<DocItem> = new Array<DocItem>();
  private _catItems: Array<DocItem> = new Array<DocItem>();

  public get getSection(): string | undefined {
    let ret = localStorage.getItem(NavManager.sectionStorage);
    if (ret === "undefined" || ret === "null" || !ret) return undefined;
    else return ret;
  }

  public static set setSection(value: string) {
    localStorage.setItem(this.sectionStorage, value);
    this.sectionChanged.next(value);
  }

  public get getSubSection(): string | undefined {
    let ret = localStorage.getItem(NavManager.subSectionStorage);
    if (ret === "undefined" || ret === "null" || !ret) return undefined;
    else return ret;
  }

  public static set setID(value: string) {
    localStorage.setItem(NavManager.subSectionStorage, value);
    this.subSectionChanged.next(value);
  }

  public get getID(): string | undefined {
    let ret = localStorage.getItem(NavManager.subSectionStorage);
    if (ret === "undefined" || ret === "null" || !ret) return undefined;
    else return ret;
  }

  public static set setSubSection(value: string) {
    NavManager.currentID = value;
    this.subSectionChanged.next(value);
  }

  constructor(private _componentPageTitle: PageTitle) {}

  public getNavItems(): Array<DocItem> {
    if (this.currentSection === this.getSection) return this._navItems;

    this.currentSection = this.getSection;

    if (!!this.currentSection) {
      this._navItems = NAV_ITEMS_BY_SECTIONS[this.currentSection];
    } else {
      this._navItems = [];
    }

    return this._navItems;
  }

  public getCategoryItems(): DocItem[] {
    if (!this.getSubSection && !!this._navItems) {
      this.currentSubSection = undefined;
      this._componentPageTitle.title = this.currentSection ?? "";
      return this._navItems;
    }

    if (
      !!this.currentSubSection &&
      !!this.getSubSection &&
      this.currentSubSection === this.getSubSection
    ) {
      return this._catItems;
    }

    this.currentSubSection = this.getSubSection;

    if (!!this.currentSubSection && !!this._navItems) {
      this._componentPageTitle.title = this.currentSubSection ?? "";
      this._catItems =
        this._navItems.find((x) => x.id === this.currentSubSection)?.items ??
        [];
    }

    return this._catItems;
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

  getItemById(id: string, section: string): DocItem | undefined {
    return NAV_ITEMS_BY_SECTIONS[section].find((doc) => doc.id === id);
  }
}
