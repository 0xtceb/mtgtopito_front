import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private url: string = "https://api.magicthegathering.io/v1/cards/";

  constructor(private http:HttpClient) { }

  public searchCardByName(name: string): Observable<Card[]> {
    return this.http.get(this.url, {params: {"name": name}}).pipe(
      map(res => {
        let cards : Card[] = res["cards"];
        console.log(cards);
        return cards.filter(this.hasUrl).filter(this.isLegal);
      })
    );
  }

  public searchCommanderByName(name: string): Observable<Card[]> {
    return this.http.get(this.url, {params: {"name": name}}).pipe(
      map(res => {
        let cards : Card[] = res["cards"];
        return cards.filter(this.isCommander).filter(this.isLegal);
      })
    );
  }

  private hasUrl(element: Card, index: Number, array: Card[]) {
    if(element.imageUrl) {
      return element;
    }
  }

  private isCommander(element: Card, index: Number, array: Card[]) {
    if (element.text) {
      if(element.imageUrl && (element.types.includes("Creature") && element.supertypes.includes("Legendary")) ||
          (element.text.indexOf("can be your commander") > 0)) {
        return element;
      }
    }
  }

  private isLegal(element: Card, index: Number, array: Card[]) {
    for(let legality of element.legalities) {
      if (legality.format == 'Duel' && legality.legality == 'Legal') {
        return element;
      }
    }
  }

  public getCard(uid: number): Observable<Card> {
    return this.http.get<Card>(this.url + uid).pipe(
      map((res) => {
        return res["card"];
      })
    );
  }
}
