import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { Character } from './models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  @Input() characterId: number = 1;
  character?: Character;

  constructor(
    private readonly charactersService: CharactersService,
  ) { }

  ngOnInit(): void {
    this.loadCharacter();
  }

  public loadCharacter() {
    this.subscriptions.push(
      this.charactersService.getCharacter(this.characterId)
        .subscribe((character: Character) => {
          this.character = character;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }
}
