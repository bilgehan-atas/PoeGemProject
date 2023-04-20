import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DynamicColorDirective } from './helpers/directives/dynamic-color.directive';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AltGemscontentComponent } from './components/gemscontent/altgemscontent/altgemscontent.component';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent, WelcomeLeagueselectDialog } from './components/welcome/welcome.component';

import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { SelectLeagueComponent } from './shared/select-league/select-league.component';

import { Routes, RouterModule } from '@angular/router';

import { DataService } from './services/data.service';
import { FetchService } from './services/fetch.service';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'Alternative Qualities', component: AltGemscontentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AltGemscontentComponent,
    DropdownComponent,
    DynamicColorDirective,
    HeaderComponent,
    WelcomeComponent,
    WelcomeLeagueselectDialog,
    SelectLeagueComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [DataService, FetchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
