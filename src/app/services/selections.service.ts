import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionsService {
  constructor(private route: ActivatedRoute) {}

  getSelectedLeague() {
    return this.route.queryParams.pipe(
      tap(() => console.log),
      map((query) => query['league'])
    );
  }
}
