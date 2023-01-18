import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderModule, PageHeader} from './page-header';
import {DocsAppTestingModule} from '../../testing/testing-module';


describe('ComponentPageHeader', () => {
  let fixture: ComponentFixture<PageHeader>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HeaderModule, DocsAppTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeader);
  });

  it('should return the title', () => {
    const component = fixture.componentInstance;
    const title = 'foobar';
    fixture.detectChanges();
    component._pageTitle.CurrentTitle = title;
    expect(component.getTitle()).toEqual(title);
  });

  it('should emit a toggleSideNav event', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.toggleSidenav, 'emit');
    fixture
      .nativeElement
      .querySelector('.sidenav-toggle')
      .click();
    expect(component.toggleSidenav.emit).toHaveBeenCalled();
  });
});
