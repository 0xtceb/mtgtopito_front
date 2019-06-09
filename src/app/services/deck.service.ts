import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from '../models/deck';
import { Card } from '../models/card';
import { environment } from '../../environments/environment';
//import { DECKS } from '../DECKS';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private http: HttpClient,
              private router: Router) { }

  getDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(environment.apiUrl + environment.decks).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getDeck(uid: string): Observable<Deck> {
    return this.http.get<Deck>(environment.apiUrl + environment.decks + uid + '/').pipe(
      catchError(this.handleError)
    );
  }

  addDeck(deck: Deck): Observable<Deck> {
    let commander:Card = deck.commander;

    return this.http.post<Deck>(environment.apiUrl + environment.decks, {
      name: deck.name,
      commander: {
        multiverseid: commander.multiverseid,
        name: commander.name,
        imageUrl: commander.imageUrl,
      },
      cards: deck.cards,
      ligue: []
    });
  }

  modifyDeck(deck:Deck):Observable<Deck> {
    return this.http.put<Deck>(environment.apiUrl + environment.decks + deck.id + '/', deck);
  }

  deleteDeck(deck:Deck): Observable<any> {
    return this.http.delete(deck.url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0 || error.status == 401) {
      localStorage.clear();
      window.location.href = window.location.origin;
    }
    return throwError('Something bad happened; please try again later.');
  }


}
