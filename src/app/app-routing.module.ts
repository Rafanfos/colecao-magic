import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoosterSearchComponent } from './booster-search/booster-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/booster-search', pathMatch: 'full' }, // Rota padrão redireciona para a página inicial
  { path: 'booster-search', component: BoosterSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
