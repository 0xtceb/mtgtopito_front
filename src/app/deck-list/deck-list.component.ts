import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';
import { Router } from '@angular/router';
import { Deck } from '../models/deck';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {

  decks: Deck[] = [];
  selectedDeck: Deck;

  constructor(
    private router: Router,
    private deckService: DeckService) { }

  ngOnInit() {
    this.getDecks();
  }

  deckDetail(deck: Deck): void {
    console.log(deck);
    this.selectedDeck = deck;
    this.router.navigate(['deck', this.selectedDeck.id]);
  }

  createDeck(): void {
    this.router.navigate(['deck'])
  }

  private getDecks():void {
    this.deckService.getDecks().subscribe(
      (decks:Deck[]) => {
        this.decks = decks
      }
    );
  }
}
