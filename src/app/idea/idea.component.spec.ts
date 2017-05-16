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

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [IdeaService]
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

  describe('when service as no ideas', () => {
    let de;
    let el;
    beforeEach(() => {
      de = fixture.debugElement.query(By.css('idea-item'));
    });

    it('should not display any idea', () => {
      expect(de).toBeNull();
    });
  });

  describe('when service as ideas', () => {
    let de;
    beforeEach(() => {
      ideaService.add({name: 'idea 1', description: 'Big description number one'});
      ideaService.add({name: 'idea 2', description: 'Small description'});
      ideaService.add({name: 'idea 3', description: 'Just one big description used for testing'});
    });

    it('should display 3 ideas', () => {
      de = fixture.debugElement.query(By.css('idea-item'));
      console.log('debugElement:', fixture.debugElement);
      expect(de.length).toBe(3);
    });
  });

  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

});
