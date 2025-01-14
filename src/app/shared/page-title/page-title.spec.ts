import {PageTitle} from './page-title';
import {Title} from '@angular/platform-browser';

describe('ComponentPageTitle', () => {
  const title: Title = new Title({});
  const service: PageTitle = new PageTitle(title);

  it('should initialize title to empty string', () => {
    expect(service._title).toEqual('');
    expect(service.CurrentTitle).toEqual('');
  });
});
