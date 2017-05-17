import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
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
      saveButton = fixture.debugElement
        .query(By.css('new-idea-save'));
    });

    it('should not any error visible', () => {
      let errorDiv = fixture.nativeElement
        .querySelectorAll('.new-idea-error');
      expect(errorDiv.length)
        .toBe(0, 'New Idea Name error is displayed');

    });

    describe('when using wrong name', () => {
      describe('emtpy name', () => {
        beforeEach(() => {
          ideaNameInput.value = '';
          saveButton.triggerEventHandler('click', null);
        });

        it('should display an error', () => {
          let errorDiv = fixture.nativeElement
            .querySelectorAll('.new-idea-error');
          expect(errorDiv.length)
            .toBe(1, 'Missing error messages for empty name');
          expect(errorDiv.textContent)
            .toContain('The name field cannot be empty',
            'Invalid empty name message');
        });
      });
    });
  });
});
