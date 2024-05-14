import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoosterSearchComponent } from './booster-search/booster-search.component';
import { BoostersShowcaseComponent } from './boosters-showcase/boosters-showcase.component';

const routes: Routes = [
  { path: '', redirectTo: '/booster-search', pathMatch: 'full' }, // Rota padrão redireciona para a página inicial
  { path: 'booster-search', component: BoosterSearchComponent },
  { path: 'boosters-showcase', component: BoostersShowcaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
