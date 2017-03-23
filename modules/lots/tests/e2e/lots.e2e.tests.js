'use strict';

describe('Lots E2E Tests:', function () {
  describe('Test Lots page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/lots');
      expect(element.all(by.repeater('lot in lots')).count()).toEqual(0);
    });
  });
});
