import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SelectionsService } from 'src/app/services/selections.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private selections: SelectionsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  selectedLeague: string;

  navigate(nav: string) {
    console.log(this.selectedLeague)
    if (this.selectedLeague) {
      console.log('if', this.selectedLeague)
      this.router.navigate([nav], { queryParams: { league: this.selectedLeague } });
    }
    else { console.log('else') }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    nav: string
  ): void {
    this.dialog.open(WelcomeLeagueselectDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { selectedLeague: this.selectedLeague, nav: nav }
    });

  }

  ngOnInit(): void {
    this.selections
      .getSelectedLeague()
      .subscribe((league) => (this.selectedLeague = league));
  }
}

@Component({
  selector: 'welcome.leagueselect-dialog',
  templateUrl: './welcome.leagueselect-dialog.html',
  styleUrls: ['./welcome.leagueselect-dialog.scss']
})
export class WelcomeLeagueselectDialog {
  constructor(public dialogRef: MatDialogRef<WelcomeLeagueselectDialog>, @Inject(MAT_DIALOG_DATA) public data: {selectedLeague: string, nav: string}, private router: Router) {}

  navigate(nav: string) {
    console.log(nav)
    this.router.navigate([nav], { queryParamsHandling: 'merge' });
    
  }
}
