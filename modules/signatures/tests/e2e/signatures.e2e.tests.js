'use strict';

describe('Signatures E2E Tests:', function () {
  describe('Test Signatures page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/signatures');
      expect(element.all(by.repeater('signature in signatures')).count()).toEqual(0);
    });
  });
});
