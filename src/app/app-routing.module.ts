import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoosterSearchComponent } from './components/booster-search/booster-search.component';
import { BoostersShowcaseComponent } from './components/boosters-showcase/boosters-showcase.component';
import { CardsShowcaseComponent } from './components/cards-showcase/cards-showcase.component';

const routes: Routes = [
  { path: '', redirectTo: '/booster-search', pathMatch: 'full' }, // Rota padrão redireciona para a página inicial
  { path: 'booster-search', component: BoosterSearchComponent },
  { path: 'boosters-showcase', component: BoostersShowcaseComponent },
  { path: 'cards-showcase', component: CardsShowcaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
