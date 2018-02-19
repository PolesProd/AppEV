'use strict';

describe('Sites E2E Tests:', function () {
  describe('Test sites page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/sites');
      expect(element.all(by.repeater('site in sites')).count()).toEqual(0);
    });
  });
});
