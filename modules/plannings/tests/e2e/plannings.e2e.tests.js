'use strict';

describe('Plannings E2E Tests:', function () {
  describe('Test Plannings page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/plannings');
      expect(element.all(by.repeater('planning in plannings')).count()).toEqual(0);
    });
  });
});
