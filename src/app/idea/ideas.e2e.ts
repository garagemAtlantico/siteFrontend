import { browser, by, element } from 'protractor';

describe('Idea', () => {

  beforeEach(() => {
    browser.get('/#/idea');
  });

  it('should have form to add new ideas', () => {
    let subject = element(by.css('.new-idea')).isPresent();
    let result = true;
    expect(subject).toEqual(result);
  });

  describe('when successfully adding new idea', () => {
    beforeEach(() => {
      element(by.css('.unhide-new-idea-form')).click();

      let ideaName = element(by.css('.new-idea-name'));
      let ideaDescription = element(by.css('.new-idea-description'));
      let button = element(by.css('.new-idea-save'));
      ideaName.sendKeys('new idea');
      ideaDescription.sendKeys('This is a very interesting idea');
      button.click();
    });

    it('should add new idea', () => {
      let ideaList = element(by.css('.idea-item'));

      expect(ideaList.element(by.css('.idea-title')).getText()).toEqual('new idea');
      expect(ideaList.element(by.css('.idea-description')).getText())
        .toEqual('This is a very interesting idea');
    });
  });
});
