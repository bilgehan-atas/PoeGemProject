import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DynamicColorDirective } from './helpers/directives/dynamic-color.directive';

import { DataService } from './services/data.service';
import { FetchService } from './services/fetch.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AltGemscontentComponent } from './components/gemscontent/altgemscontent/altgemscontent.component';

const appRoutes: Routes = [
  { path: 'Alternative Qualities', component: AltGemscontentComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    AltGemscontentComponent,
    DropdownComponent,
    HeaderComponent,
    DynamicColorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    DataService,
    FetchService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
