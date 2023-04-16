import { TestBed } from '@angular/core/testing';

import { CharactersService } from './characters.service';
import { HttpClient } from '@angular/common/http';
import { Character } from './models';
import { of } from 'rxjs';

const characterMock: Character = {
  id: 1,
  name: "Rick Sanchez",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
};
const characterMock2: Character = {
  id: 2,
  name: "Morty Smith",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
};

describe('CharactersService', () => {
  let service: CharactersService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: spy,
        }
      ]
    });
    service = TestBed.inject(CharactersService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return a Character instance', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(characterMock));
    service.getCharacter(1).subscribe((character) => {
      expect(character).toEqual(characterMock);
      done();
    })
  });
  
  it('should return a Morty Character instance', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(characterMock2));
    service.getCharacter(2).subscribe((character) => {
      expect(character).not.toEqual(characterMock);
      done();
    })
  });
});
