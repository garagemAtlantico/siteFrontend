import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/**
 * Load the implementations that should be tested
 */
import { IdeaService } from './idea.service';
import { IdeaType } from './idea.service.interface';

describe(`IdeaService`, () => {
  let service: IdeaService;

  beforeEach(async(() => {
    service = new IdeaService();
  }));

  describe('when no ideas are present', () => {
    describe('add a new idea', () => {

      beforeEach((done) => {
        let idea = { name: 'one', description: 'desc', creationDate: new Date() };
        service.add(idea).subscribe(() => {
          done();
        });
      });

      it('size will be 1', async(() => {
        service.size().subscribe((size) => {
          expect(size).toBe(1);
        });
      }));

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
      service.add({ name: 'one', description: 'description', creationDate: new Date() });
      service.add({ name: 'two', description: 'description 1', creationDate: new Date() });
    });

    it('should retrieve 2 ideas', async(() => {
      service.getIdeas().subscribe((ideas) => {
        expect(ideas.length).toBe(2);
      });
    }));

    it('size should be 2', async(() => {
      service.size().subscribe((size) => {
        expect(size).toBe(2);
      });
    }));
  });
});
