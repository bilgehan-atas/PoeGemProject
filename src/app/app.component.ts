import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'poe.thaumaturgy : gem crafting calculation tool for Path Of Exile';

  constructor(private route: ActivatedRoute) {}

  selectedLeague: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      if (query['league']) {
        this.selectedLeague = query['league'];
      } else {
        this.selectedLeague = ''
      }
    });
  }
}
