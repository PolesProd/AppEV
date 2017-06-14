'use strict';

describe('Employes E2E Tests:', function () {
  describe('Test Employes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/employes');
      expect(element.all(by.repeater('employe in employes')).count()).toEqual(0);
    });
  });
});
