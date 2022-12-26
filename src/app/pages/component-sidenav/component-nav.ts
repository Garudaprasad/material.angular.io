import { trigger, state, style, transition, animate } from "@angular/animations";
import { Component, Input } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { DocumentationItems } from "src/app/shared/documentation-items/documentation-items";

@Component({
  selector: "app-component-nav",
  templateUrl: "./component-nav.html",
  animations: [
    trigger("bodyExpansion", [
      state("collapsed", style({ height: "0px", display: "none" })),
      state("expanded", style({ height: "*", display: "block" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4,0.0,0.2,1)")
      ),
    ]),
  ],
})
export class ComponentNav {
  @Input() params: Observable<Params> | undefined;
  currentItemId: string | undefined;

  constructor(public docItems: DocumentationItems) {}
}