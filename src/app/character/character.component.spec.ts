import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterComponent } from './character.component';
import { CharactersService } from './characters.service';
import { of } from 'rxjs';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let charactersServiceSpy: jasmine.SpyObj<CharactersService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CharactersService', ['getCharacter']);

    await TestBed.configureTestingModule({
      declarations: [CharacterComponent],
      providers: [
        {
          provide: CharactersService,
          useValue: spy,
        }
      ]
    })
      .compileComponents();

    charactersServiceSpy = TestBed.inject(CharactersService) as jasmine.SpyObj<CharactersService>;

    charactersServiceSpy.getCharacter.and.returnValue(of());

    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.characterId = 1;
    expect(component).toBeTruthy();
  });

  it('should read the character id input', () => {
    expect(component.characterId).toBe(1);
  });
  
  it('should call getCharacter method', () => {
    expect(charactersServiceSpy.getCharacter).toHaveBeenCalled();
  });
});
