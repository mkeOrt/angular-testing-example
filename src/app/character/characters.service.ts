import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from './models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getCharacter(characterId: number): Observable<Character> {
    return this.http
      .get<Character>(`https://rickandmortyapi.com/api/character/${characterId}`)
      .pipe(map((character) => ({
        id: character.id,
        name: character.name,
        image: character.image,
        species: character.species,
      })));
  }
}
