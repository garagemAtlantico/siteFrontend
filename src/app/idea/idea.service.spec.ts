import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

/**
 * Load the implementations that should be tested
 */
import { IdeaService, IdeaType } from './idea.service';

describe(`IdeaService`, () => {
  let service: IdeaService;

  beforeEach(async(() => {
    service = new IdeaService();
  }));

  describe('when no ideas are present', () => {
    describe('add a new idea', () => {

      beforeEach(() => {
        service.add({ name: 'one', description: 'desc' });
      });

      it('size will be 1', () => {
        expect(service.size()).toBe(1);
      });

      it('should return the added idea', () => {
        let results: IdeaType[] = service.ideas();
        expect(results.length).toBe(1);
        let result = results[0];

        expect(result.name).toEqual('one');
        expect(result.description).toEqual('desc');
      });
    });
  });

  describe('when two ideas are present', () => {
    beforeEach(() => {
      service.add({ name: 'one', description: 'description' });
      service.add({ name: 'two', description: 'description 1' });
    });

    it('size should be 2', () => {
      let ideas = service.ideas();
      expect(ideas.length).toBe(2);
    });
  });
});
