import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
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
  showAdd: boolean = false;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private deckService: DeckService) { }

  ngOnInit() {
    this.getDecks();
  }

  deckDetail(deck: Deck): void {
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
        if (this.decks.length == 0) {
          this.showAdd = true;
        }
      }
    );
  }

  deleteDeck(deck:Deck): void {

    let dialogConfirmRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data : {
        title:       'Suppression du deck',
        message:     'Vous êtes sur le point de supprimer ce deck et toutes ses données.',
        acceptation: 'Valider',
        annulation:  'Annuler'
      },
      disableClose: true
    });
    dialogConfirmRef.afterClosed().subscribe((data:any) => {
      if (data.result) {
        let index = this.decks.indexOf(deck);
        this.deckService.deleteDeck(deck).subscribe((_) => {
          this.decks.splice(index, 1);
          if (this.decks.length == 0) {
            this.showAdd = true;
          }
        });
      }
    });
  }
}
