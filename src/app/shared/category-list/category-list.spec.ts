import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Params} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {DocsAppTestingModule} from '../../testing/testing-module';
import {CategoryList, CategoryListModule} from './category-list';

describe('ComponentCategoryList', () => {
  let fixture: ComponentFixture<CategoryList>;
  let params: BehaviorSubject<Params>;

  beforeEach(waitForAsync(() => {
    params = new BehaviorSubject<Params>({});

    const fakeActivatedRoute = {
      snapshot: {},
      pathFromRoot: [{params}]
    };

    TestBed.configureTestingModule({
      imports: [CategoryListModule, DocsAppTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryList);
  });

  it('should render a card for every component', () => {
    // Usually the component category list component won't be instantiated if the activated
    // route does not contain a `section` param. In case there is no section param before
    // `ngOnInit` subscribes to the activated route params, and an error will be raised.
    params.next({section: 'components'});
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const components = component.navMgr.getItems('components');
    const cards = fixture
        .nativeElement.querySelectorAll('.category-list-card');
    expect(cards.length).toEqual(components.length);
  });
});
