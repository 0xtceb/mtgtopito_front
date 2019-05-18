import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Deck, DeckCard } from '../models/deck';
import { DeckService } from '../services/deck.service';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';
import { tap, switchMap, debounceTime, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css']
})
export class DeckDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private deckService: DeckService,
              private cardService: CardService) { }

  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'type'];

  deck: Deck;
  selectedCommander: Card;
  selectedCard : Card;

  commanderSearchControl = new FormControl();
  cardSearchControl = new FormControl();

  filteredCards: Card[] = [];
  filteredCommanders: Card[] = [];
  commanderIsLoading: boolean = false;
  cardIsLoading: boolean = false;

  loadImage: boolean = false;


  ngOnInit() {
    if (this.route.children.length > 0) {
      const id = this.route.children[0].snapshot.paramMap.get("id");
      this.deckService.getDeck(id).subscribe(deck => {
        this.deck = deck;
        this.dataSource = new MatTableDataSource(this.deck.cards);
      });

    } else {
      this.deck = new Deck();
      this.dataSource = new MatTableDataSource(this.deck.cards)
    }

    this.commanderSearchControl.valueChanges.pipe(
      debounceTime(1000),
      tap(() => {
        this.commanderIsLoading = true
      }),
      switchMap(value => this.cardService.searchCommanderByName(value).pipe(
        finalize(() => this.commanderIsLoading = false)
      ))
    ).subscribe(cards => this.filteredCommanders = cards);


    this.cardSearchControl.valueChanges.pipe(
      debounceTime(1000),
      tap(() => {
        this.cardIsLoading = true
      }),
      switchMap(value => this.cardService.searchCardByName(value).pipe(
        finalize(() => this.cardIsLoading = false)
      ))
    ).subscribe(cards => this.filteredCards = cards);
  }

  commanderFn(card: Card) {
    if (card) {
      return card.name;
    }
  }

  cardFn(card: Card) {
    if (card) {
      return card.name;
    }
  }

  addCard(card:Card) {
    if(!this.deck.cards) {
      this.deck.cards = [];
    }
    let deckCard = new DeckCard(card);
    this.deck.cards.push(deckCard);
    this.dataSource = new MatTableDataSource(this.deck.cards);
  }

  openDetails(card:Card) {
    this.loadImage = true;
    this.selectedCard = null;
    this.cardService.getCard(card.multiverseid).subscribe(card => {
      this.loadImage = false;
      this.selectedCard = card;
    });
  }
}
