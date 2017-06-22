'use strict';

describe('Rhdatas E2E Tests:', function () {
  describe('Test Rhdatas page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/rhdatas');
      expect(element.all(by.repeater('rhdata in rhdatas')).count()).toEqual(0);
    });
  });
});
