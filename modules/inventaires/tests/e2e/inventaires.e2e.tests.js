'use strict';

describe('Inventaires E2E Tests:', function () {
  describe('Test inventaires page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/inventaires');
      expect(element.all(by.repeater('inventaire in inventaires')).count()).toEqual(0);
    });
  });
});
