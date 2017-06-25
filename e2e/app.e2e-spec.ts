import { TabajaraPage } from './app.po';

describe('tabajara App', () => {
  let page: TabajaraPage;

  beforeEach(() => {
    page = new TabajaraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
