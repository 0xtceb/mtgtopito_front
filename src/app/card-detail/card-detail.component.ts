import { Component, OnInit, Input } from '@angular/core';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  @Input() card: Card;
  isLoading = true;

  constructor(private cardService: CardService) { }

  ngOnInit() {
  }
}
