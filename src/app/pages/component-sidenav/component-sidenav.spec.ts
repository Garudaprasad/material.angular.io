import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {take} from 'rxjs/operators';
import {DocsAppTestingModule} from '../../testing/testing-module';
import {MatSidenav} from '@angular/material/sidenav';
import { ComponentSidenav } from './component-sidenav';
import { ComponentSidenavModule } from './component-sidenav.module';

describe('ComponentSidenav', () => {
  let fixture: ComponentFixture<ComponentSidenav>;
  let component: ComponentSidenav;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ComponentSidenavModule, DocsAppTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSidenav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should close the sidenav on init', () => {
    // Spy on window.mediaMatch and return stub
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true
    } as any);

    // TODO refactor this as none of these expectations are ever verified
    waitForAsync(() => {
      expect(component.sidenav instanceof MatSidenav).toBeTruthy();
      component.isScreenSmall.pipe(take(1)).subscribe(isSmall => expect(isSmall).toBeTruthy());
      expect(component.sidenav.opened).toBe(false);
    });
  });
});
