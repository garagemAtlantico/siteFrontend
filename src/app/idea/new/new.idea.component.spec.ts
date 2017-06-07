import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  fakeAsync,
  tick,
  ComponentFixture
} from '@angular/core/testing';
import {
  Http,
  ResponseOptions,
  Response,
  RequestOptions,
} from '@angular/http';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/**
 * Load the implementations that should be tested
 */
import { NewIdeaComponent } from './new.idea.component';
import { IdeaService } from '../idea.service';
import { IdeaType, IdeaServiceInterface } from '../idea.service.interface';

describe(`NewIdea`, () => {
  let comp: NewIdeaComponent;
  let fixture: ComponentFixture<NewIdeaComponent>;
  let ideaService: IdeaService;
  let eventEmmiterSpy;
  let mockHttp: Http;

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    mockHttp = { post: null, get: null } as Http;

    ideaService = new IdeaService(mockHttp);
    let addSpy = spyOn(ideaService, 'add');
    addSpy.and.returnValue(Observable.of({}));
    TestBed.configureTestingModule({
      declarations: [
        NewIdeaComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule],
      providers: [
        { provide: IdeaService, useValue: ideaService },
      ]
    })
      /**
       * Compile template and css
       */
      .compileComponents();
    fixture = TestBed.createComponent(NewIdeaComponent);
    comp = fixture.componentInstance;
    eventEmmiterSpy = spyOn(comp.onIdeaAdd, 'emit');
    ideaService = fixture.debugElement.injector.get(IdeaService);
  }));

  it('should have inputs to add new ideas', () => {
    let ideaNameInput = fixture.nativeElement.querySelectorAll('.new-idea-name');
    let ideaDescInput = fixture.nativeElement.querySelectorAll('.new-idea-description');
    let saveIdeaButton = fixture.nativeElement.querySelectorAll('.new-idea-save');
    expect(ideaNameInput.length).toBe(1, 'Missing New Idea Name input');
    expect(ideaDescInput.length).toBe(1, 'Missing New Idea Description input');
    expect(saveIdeaButton.length).toBe(1, 'Missing New Idea save button');
  });

  describe('adding a new idea', () => {
    let ideaNameInput;
    let ideaDescInput;
    let saveButton;
    beforeEach(() => {
      ideaNameInput = fixture.nativeElement
        .querySelectorAll('.new-idea-name')[0];
      ideaDescInput = fixture.nativeElement
        .querySelectorAll('.new-idea-description')[0];
      saveButton = fixture.debugElement.nativeElement.querySelector(
        '.new-idea-save');
    });

    it('should not any error visible', () => {
      let nameErrorDiv = fixture.nativeElement
        .querySelectorAll('.new-idea-name-error');
      expect(nameErrorDiv.length)
        .toBe(0, 'New Idea Name error is displayed');
      let descErrorDiv = fixture.nativeElement
        .querySelectorAll('.new-idea-desc-error');
      expect(descErrorDiv.length)
        .toBe(0, 'New Idea Description error is displayed');
    });

    describe('when using wrong name', () => {
      describe('emtpy name', () => {
        beforeEach(async(() => {
          fixture.detectChanges();
          ideaNameInput.value = '';
          ideaNameInput.dispatchEvent(new Event('input'));
          ideaDescInput.value = 'This is the new description of the idea';
          ideaDescInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          saveButton.click();
          fixture.detectChanges();
        }));

        it('should not display a description error', () => {
          let errorDiv = fixture.nativeElement
            .querySelectorAll('.new-idea-desc-error');
          expect(errorDiv.length)
            .toBe(0, 'Description field error displayed');
        });

        it('should display an error', () => {
          let errorDiv = fixture.nativeElement
            .querySelectorAll('.new-idea-name-error');
          expect(errorDiv.length)
            .toBe(1, 'Missing error messages for empty name');
          expect(errorDiv[0].textContent)
            .toContain('The name field cannot be empty',
            'Invalid empty name message');
        });

        it('should not emit event', () => {
          expect(eventEmmiterSpy).not.toHaveBeenCalled();
        });

        describe('when a correct name is supplied', () => {
          beforeEach(async(() => {
            ideaNameInput.value = 'idea name';
            ideaNameInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            saveButton.click();
            fixture.detectChanges();
          }));

          it('should not display the name error', () => {
            let errorDiv = fixture.nativeElement
              .querySelectorAll('.new-idea-name-error');
            expect(errorDiv.length)
              .toBe(0, 'Name field error displayed');
          });

          it('should emit event', () => {
            expect(eventEmmiterSpy).toHaveBeenCalled();
          });
        });
      });
    });

    describe('when using wrong description', () => {
      describe('emtpy description', () => {
        beforeEach(async(() => {
          fixture.detectChanges();
          ideaNameInput.value = 'New idea';
          ideaDescInput.value = '';
          ideaNameInput.dispatchEvent(new Event('input'));
          ideaDescInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          saveButton.click();
          fixture.detectChanges();
        }));

        it('should not display name error', () => {
          let errorDiv = fixture.nativeElement
            .querySelectorAll('.new-idea-name-error');
          expect(errorDiv.length)
            .toBe(0, 'Name field error displayed');
        });

        it('should display an error', () => {
          let errorDiv = fixture.nativeElement
            .querySelectorAll('.new-idea-desc-error');
          expect(errorDiv.length)
            .toBe(1, 'Missing error messages for empty description');
          expect(errorDiv[0].textContent)
            .toContain('The description field cannot be empty',
            'Invalid empty description message');
        });

        it('should not emit event', () => {
          expect(eventEmmiterSpy).not.toHaveBeenCalled();
        });

        describe('when a correct description is supplied', () => {
          beforeEach(async(() => {
            ideaDescInput.value = 'new description';
            ideaDescInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            saveButton.click();
            fixture.detectChanges();
          }));

          it('should not display the description error', () => {
            let errorDiv = fixture.nativeElement
              .querySelectorAll('.new-idea-desc-error');
            expect(errorDiv.length)
              .toBe(0, 'Description field error displayed');
          });

          it('should emit event', () => {
            expect(eventEmmiterSpy).toHaveBeenCalled();
          });
        });
      });
    });

    describe('when is successfull', () => {
      beforeEach(async(() => {
        fixture.detectChanges();
        ideaNameInput.value = 'New Idea';
        ideaNameInput.dispatchEvent(new Event('input'));
        ideaDescInput.value = 'This is the new description of the idea';
        ideaDescInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        saveButton.click();
        fixture.detectChanges();
      }));

      it('should not display the name error', () => {
        let errorDiv = fixture.nativeElement
          .querySelectorAll('.new-idea-name-error');
        expect(errorDiv.length)
          .toBe(0, 'Name field error displayed');
      });

      it('should not display the description error', () => {
        let errorDiv = fixture.nativeElement
          .querySelectorAll('.new-idea-desc-error');
        expect(errorDiv.length)
          .toBe(0, 'Description field error displayed');
      });

      it('should emit event', () => {
        expect(eventEmmiterSpy).toHaveBeenCalled();
      });
    });
  });
});
