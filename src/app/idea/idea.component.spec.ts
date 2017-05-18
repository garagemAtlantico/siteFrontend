import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  fakeAsync,
  tick,
  ComponentFixture
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Load the implementations that should be tested
 */
import { IdeaComponent } from './idea.component';
import { IdeaService } from './idea.service';

describe(`Idea`, () => {
  let comp: IdeaComponent;
  let fixture: ComponentFixture<IdeaComponent>;
  let ideaService: IdeaService;
  let ideasSpy;

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    ideaService = new IdeaService();
    ideasSpy = spyOn(ideaService, 'ideas');
    TestBed.configureTestingModule({
      declarations: [IdeaComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: IdeaService, useValue: ideaService },
      ]
    })
      /**
       * Compile template and css
       */
      .compileComponents();
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaComponent);
    comp = fixture.componentInstance;
    ideaService = fixture.debugElement.injector.get(IdeaService);

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it('should have inputs to add new ideas', () => {
    let ideaNameInput = fixture.nativeElement.querySelectorAll('.new-idea-name');
    let ideaDescInput = fixture.nativeElement.querySelectorAll('.new-idea-description');
    let saveIdeaButton = fixture.nativeElement.querySelectorAll('.new-idea-save');
    expect(ideaNameInput.length).toBe(1, 'Missing New Idea Name input');
    expect(ideaDescInput.length).toBe(1, 'Missing New Idea Description input');
    expect(saveIdeaButton.length).toBe(1, 'Missing New Idea save button');
  });

  describe('when service as no ideas', () => {
    let de;
    let el;
    beforeEach(() => {
      ideasSpy.and.returnValue([]);
      de = fixture.debugElement.query(By.css('idea-item'));
    });

    it('should not display any idea', () => {
      expect(de).toBeNull('Should not display any idea');
    });
  });

  describe('when service as ideas', () => {
    let de;
    beforeEach(() => {
      let allIdeas = [
        { name: 'idea 1', description: 'Big description number one' },
        { name: 'idea 2', description: 'Small description' },
        { name: 'idea 3', description: 'Just one big description used for testing' }
      ];

      ideasSpy.and.returnValue(allIdeas);
      comp.retrieveIdeas();

      fixture.detectChanges();
    });

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

    xdescribe('when using wrong name', () => {
      describe('emtpy name', () => {
        beforeEach(fakeAsync(() => {
          ideaNameInput.value = '';
          ideaDescInput.value = 'This is the new description of the idea';
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
      });
    });

    xdescribe('when using wrong description', () => {
      describe('emtpy description', () => {
        beforeEach(fakeAsync(() => {
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
      });
    });

    xdescribe('when is successfull', () => {
      beforeEach(fakeAsync(() => {
        ideaNameInput.value = 'New Idea';
        ideaDescInput.value = 'This is the new description of the idea';
        saveButton.click();
        fixture.detectChanges();
      }));

      it('should display 1 idea', () => {
        let de = fixture.nativeElement.querySelectorAll('.idea-item');
        expect(de.length).toBe(1, 'Should display 1 idea');
      });

      it('first idea should be "New idea"', () => {
        let de = fixture.nativeElement.querySelectorAll('.idea-item .idea-title')[0];
        expect(de.textContent).toContain('New idea', 'Idea name do not match');
      });

      it('first idea description should be "This is the new description of the idea"', () => {
        let de = fixture.nativeElement.querySelectorAll('.idea-item .idea-description')[0];
        expect(de.textContent).toContain('This is the new description of the idea',
          'Idea description do not match');
      });
    });
  });
});
