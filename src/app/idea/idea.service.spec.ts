import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import {
  Http,
  ResponseOptions,
  Response,
  RequestOptions,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/**
 * Load the implementations that should be tested
 */
import { IdeaService } from './idea.service';
import { IdeaType } from './idea.service.interface';

describe(`IdeaService`, () => {
  let service: IdeaService;
  let mockHttp: Http;

  beforeEach(() => {
    mockHttp = { post: null, get: null } as Http;
    service = new IdeaService(mockHttp);
  });

  describe('when no ideas are present', () => {
    let mockedAnswer: IdeaType;

    describe('add a new idea', () => {
      let idea;
      let options;

      beforeEach((done) => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let headerOptions = {};
        headerOptions['headers'] = headers;
        options = new RequestOptions(headerOptions);
        idea = { name: 'one', description: 'desc', creationDate: new Date() };

        spyOn(mockHttp, 'post').and.returnValue(Observable.of({
          json: () => [idea]
        }));
        service.add(idea).subscribe((value) => {
          mockedAnswer = value;
          done();
        });
      });

      it('post with correct parameters', () => {
        expect(mockHttp.post).toHaveBeenCalledWith(
          'http://localhost:3000/ideas',
          idea,
          options,
        );
      });

      it('should return the added idea', () => {
        expect(mockedAnswer['name']).toEqual('one');
        expect(mockedAnswer['description']).toEqual('desc');
      });
    });
  });

  describe('when two ideas are present', () => {
    let mockedAnswer: IdeaType[];
    let ideas: IdeaType[];
    let options;

    beforeEach((done) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let headerOptions = {};
      headerOptions['headers'] = headers;
      options = new RequestOptions(headerOptions);

      ideas = [
        { name: 'one', description: 'description', creationDate: new Date() },
        { name: 'two', description: 'description 1', creationDate: new Date() }
      ];
      spyOn(mockHttp, 'get').and.returnValue(Observable.of({
        json: () => ideas
      }));
      service.getIdeas().subscribe((answerIdeas) => {
        mockedAnswer = answerIdeas;
        done();
      });
    });

    it('get with correct parameters', async(() => {
      expect(mockHttp.get).toHaveBeenCalledWith(
        'http://localhost:3000/ideas',
        options,
      );
    }));

    it('should retrieve 2 ideas', () => {
      expect(mockedAnswer.length).toBe(2);
    });

    it('size should be 2', (done) => {
      service.size().subscribe((size) => {
        expect(size).toBe(2);
        done();
      });
    });
  });
});
