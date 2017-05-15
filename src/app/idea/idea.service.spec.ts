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

  describe('add a new idea', () => {
    describe('when no ideas are present', () => {
      beforeEach(() => {
        service.add(new IdeaType({name: 'one'}))
      });
    });
  });
});
