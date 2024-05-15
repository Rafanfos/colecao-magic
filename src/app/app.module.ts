import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoosterSearchComponent } from './components/booster-search/booster-search.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoostersShowcaseComponent } from './components/boosters-showcase/boosters-showcase.component';
import { CardsShowcaseComponent } from './components/cards-showcase/cards-showcase.component';
import { ManaSymbolToIconPipe } from './pipes/mana-symbol-to-icon/mana-symbol-to-icon.pipe';
import { ManaSymbolToIconInTextPipe } from './pipes/mana-symbol-to-icon-to-text/mana-symbol-to-icon-in-text.pipe';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { ErrorScreenComponent } from './components/error-screen/error-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    BoosterSearchComponent,
    BoostersShowcaseComponent,
    CardsShowcaseComponent,
    ManaSymbolToIconPipe,
    ManaSymbolToIconInTextPipe,
    LoadingScreenComponent,
    ErrorScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
