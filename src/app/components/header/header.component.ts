import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuItems: Array<string> = ["Alternative Qualities", "Corruptions"]
  leagues: Array<string> = ["Crucible", "Standard", "Sanctum"]

  constructor(private router: Router, public FetchService:FetchService) {}

  public menuOnChange(selectedMenu: string) {
    console.log(selectedMenu)
    this.router.navigate([selectedMenu], { queryParams: {} })
  }
  public leagueOnChange(selectedLeague: string) {
    this.router.navigate([], { queryParams: { league: selectedLeague } })
  } 

}
