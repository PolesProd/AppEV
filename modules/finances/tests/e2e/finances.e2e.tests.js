'use strict';

describe('Finances E2E Tests:', function () {
  describe('Test Finances page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/finances');
      expect(element.all(by.repeater('finance in finances')).count()).toEqual(0);
    });
  });
});
