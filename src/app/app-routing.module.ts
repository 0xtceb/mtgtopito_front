import { NgModule } from '@angular/core';
import { LigueDetailComponent } from './ligue-detail/ligue-detail.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LigueDetailComponent },
  { path: 'decklist', component: DeckListComponent },
  { path: 'deck', component: DeckDetailComponent, children: [
    {
      path: ':id',
      component: DeckDetailComponent,
    },
  ]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
