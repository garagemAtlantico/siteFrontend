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

import { IdeasComponent } from './ideas.component';
import { IdeaComponent } from './idea.component';
import { NewIdeaComponent } from './new/new.idea.component';
import { IdeaService } from './idea.service';
import { IdeaServiceFake } from './idea.service.fake';
import { IdeaSortPipe } from './idea.pipe';

describe(`Ideas`, () => {
  let comp: IdeasComponent;
  let fixture: ComponentFixture<IdeasComponent>;
  let ideaService: IdeaService;
  let ideasSpy;
  let mockHttp: Http;

  beforeEach(async(() => {
    mockHttp = { post: null, get: null } as Http;
    ideaService = new IdeaServiceFake();
    TestBed.configureTestingModule({
      declarations: [
        IdeasComponent,
        IdeaComponent,
        NewIdeaComponent,
        IdeaSortPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule],
      providers: [
        { provide: IdeaService, useValue: ideaService },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(IdeasComponent);
    comp = fixture.componentInstance;
  }));

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  describe('when service as no ideas', () => {
    let de;
    let el;
    beforeEach(fakeAsync(() => {
      tick();
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('idea-item'));
    }));

    it('should not display any idea', () => {
      expect(de).toBeNull('Should not display any idea');
    });
  });

  describe('when service as ideas', () => {
    let de;
    beforeEach(fakeAsync(() => {
      ideaService.add({ name: 'idea 1', description: 'Big description number one' });
      ideaService.add({ name: 'idea 2', description: 'Small description' });
      ideaService.add({ name: 'idea 3', description: 'Just one big description used for testing' });

      comp.retrieveIdeas();
      tick();
      fixture.detectChanges();
    }));

    it('should display 3 ideas', () => {
      de = fixture.nativeElement.querySelectorAll('.idea-item');
      expect(de.length).toBe(3, 'Should display 3 ideas');
    });

    it('first idea should be "idea 1"', () => {
      de = fixture.nativeElement.querySelectorAll('.idea-item .idea-title')[0];
      expect(de.textContent).toContain('idea 1', 'Idea name do not match');
    });

    it('first idea description should be "Big description number one"', () => {
      de = fixture.nativeElement.querySelectorAll('.idea-item .idea-description')[0];
      expect(de.textContent).toContain('Big description number one',
        'Idea description do not match');
    });
  });

  describe('adding a new idea', () => {
    let ideaNameInput;
    let ideaDescInput;
    let saveButton;
    let allIdeas;

    beforeEach(() => {
      ideaService.add({
        name: 'New Idea',
        description: 'This is the new description of the idea',
        createdAt: new Date('December 17, 1995 03:24:00'),
        updatedAt: new Date('December 17, 1995 03:24:00'),
      });

      ideaNameInput = fixture.nativeElement
        .querySelectorAll('.new-idea-name')[0];
      ideaDescInput = fixture.nativeElement
        .querySelectorAll('.new-idea-description')[0];
      saveButton = fixture.debugElement.nativeElement.querySelector(
        '.new-idea-save');
    });

    it('form is not visible', () => {
      expect(fixture.debugElement.nativeElement.querySelectorAll('.new-idea-name').length).toBe(0);
    });

    describe('when unhide the new idea form', () => {
      beforeEach(() => {
        fixture.detectChanges();
        fixture.debugElement.nativeElement.querySelector('.unhide-new-idea-form').click();
        fixture.detectChanges();
      });

      it('should have inputs to add new ideas', () => {
        let ideaNameInput = fixture.nativeElement.querySelectorAll('.new-idea-name');
        let ideaDescInput = fixture.nativeElement.querySelectorAll('.new-idea-description');
        let saveIdeaButton = fixture.nativeElement.querySelectorAll('.new-idea-save');
        expect(ideaNameInput.length).toBe(1, 'Missing New Idea Name input');
        expect(ideaDescInput.length).toBe(1, 'Missing New Idea Description input');
        expect(saveIdeaButton.length).toBe(1, 'Missing New Idea save button');
      });

      describe('when is successfull', () => {
        it('should display 1 idea', () => {
          fixture.detectChanges();
          let de = fixture.nativeElement.querySelectorAll('.idea-item');
          expect(de.length).toBe(1, 'Should display 1 idea');
        });

        it('first idea should be "New idea"', () => {
          fixture.detectChanges();
          let de = fixture.nativeElement.querySelectorAll('.idea-item .idea-title')[0];
          expect(de.textContent).toContain('New Idea', 'Idea name do not match');
        });

        it('first idea description should be "This is the new description of the idea"', () => {
          fixture.detectChanges();
          let de = fixture.nativeElement.querySelectorAll('.idea-item .idea-description')[0];
          expect(de.textContent).toContain('This is the new description of the idea',
            'Idea description do not match');
        });
      });

      describe('when add another idea', () => {
        beforeEach(async(() => {
          ideaService.add({
            name: 'Newer Idea',
            description: 'This is the newer description of the idea',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          fixture.debugElement.componentInstance.ngOnInit()
          fixture.detectChanges();
        }));

        it('should display 2 ideas', () => {
          let de = fixture.nativeElement.querySelectorAll('.idea-item');
          expect(de.length).toBe(2, 'Should display 2 idea');
        });

        it('first idea should be "Newer idea"', () => {
          let de = fixture.nativeElement.querySelectorAll('.idea-item .idea-title')[0];
          expect(de.textContent).toContain('Newer Idea', 'Idea name do not match');
        });

        it('first idea description should be "This is the newer description of the idea"', () => {
          let de = fixture.nativeElement.querySelectorAll('.idea-item .idea-description')[0];
          expect(de.textContent).toContain('This is the newer description of the idea',
            'Idea description do not match');
        });
      });
    });
  });
});
