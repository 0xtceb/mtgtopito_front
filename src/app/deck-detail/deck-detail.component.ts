import { tap, switchMap, debounceTime, finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { DeckService } from '../services/deck.service';
import { CardService } from '../services/card.service';
import { Deck } from '../models/deck';
import { Card } from '../models/card';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css']
})
export class DeckDetailComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private deckService: DeckService,
              private cardService: CardService) { }

  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'type', 'quantity', 'action'];

  deck: Deck;
  selectedCommander: Card;
  selectedCard : Card;

  commanderSearchControl = new FormControl();
  cardSearchControl = new FormControl();
  deckNameControl = new FormControl();

  filteredCards: Card[] = [];
  filteredCommanders: Card[] = [];
  commanderIsLoading: boolean = false;
  cardIsLoading: boolean = false;

  quantityDisabled = true;
  quantity = 1;
  loadImage: boolean = false;
  canUpdate: boolean = false;


  ngOnInit() {
    if (this.route.children.length > 0) {

      const id = this.route.children[0].snapshot.paramMap.get("id");
      this.deckService.getDeck(id).subscribe(deck => {
        this.deck = deck;
        this.selectedCommander = this.deck.commander;
        this.deckNameControl.setValue(this.deck.name);
        this.commanderSearchControl.setValue(this.deck.commander);
        this.dataSource = new MatTableDataSource(this.deck.cards);
        this.canUpdate = true;
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

  addCard(card:Card, quantity:number = 1) {
    if(!this.deck.cards) {
      this.deck.cards = [];
    }
    card.quantity = quantity;
    if (this.deck.cards.length < 99) {
      this.deck.cards.push(card);
    }
    this.quantity = 1;
    this.dataSource = new MatTableDataSource(this.deck.cards);
  }

  openDetails(card:Card): void {
    this.loadImage = true;
    this.selectedCard = null;
    this.loadImage = false;
    this.selectedCard = card;
    if (card.supertypes.includes('Basic')) {
      this.quantityDisabled = false;
    } else {
      this.quantityDisabled = true;
    }
  }

  save(): void {
    this.deck.commander = this.selectedCommander;
    this.deck.name = this.deckNameControl.value;
    this.deckService.addDeck(this.deck).subscribe((deck:Deck) => {
      this.router.navigate(['/deck', deck.id]);
      this.canUpdate = true;
    });
  }

  update(deck:Deck):void {
    this.deck.name = this.deckNameControl.value;
    this.deck.commander = this.selectedCommander;
    this.deckService.modifyDeck(deck).subscribe();
  }

  deleteCard(card:Card): void {
    this.cardService.deleteCard(card).subscribe((_) => {
        let index = this.deck.cards.indexOf(card);
        this.deck.cards.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.deck.cards);
    });
  }
}
