import { SourcestashPage } from './app.po';

describe('sourcestash App', () => {
  let page: SourcestashPage;

  beforeEach(() => {
    page = new SourcestashPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
