import { Component, isStandalone } from '@angular/core';

import { Router } from '@angular/router';

import { SelectionsService } from 'src/app/services/selections.service';

import { MatMenuListItem } from 'src/app/types';

@Component({
  selector: 'app-select-league',
  templateUrl: './select-league.component.html',
  styleUrls: ['./select-league.component.scss'],
})
export class SelectLeagueComponent {
  selectedLeague: string;

  menuItems: MatMenuListItem[] = [
    { name: 'Alternative Qualities' },
    { name: 'Corruptions' },
  ];
  leagues: MatMenuListItem[] = [
    { name: 'Crucible' },
    { name: 'Standard' },
    { name: 'Sanctum' },
  ];

  constructor(private router: Router, private selections: SelectionsService) {}

  public menuOnChange(selectedMenu: string) {
    console.log(selectedMenu);
    this.router.navigate([selectedMenu], { queryParamsHandling: 'merge' });
  }
  public leagueOnChange(selectedLeague: string) {
    this.router.navigate([], { queryParams: { league: selectedLeague } });
  }

  ngOnInit(): void {
    this.selections
      .getSelectedLeague()
      .subscribe((league) => (this.selectedLeague = league));
  }
}
