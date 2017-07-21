import { MasterNGPage } from './app.po';

describe('master-ng App', function() {
  let page: MasterNGPage;

  beforeEach(() => {
    page = new MasterNGPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
