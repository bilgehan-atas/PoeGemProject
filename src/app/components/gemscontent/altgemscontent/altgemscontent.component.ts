import { OnInit, ViewChild, Component } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DataService } from 'src/app/services/data.service';

import { altGemData } from 'src/app/types';

@Component({
  selector: 'app-altgemscontent',
  templateUrl: './altgemscontent.component.html',
  styleUrls: ['./altgemscontent.component.scss'],
})
export class AltGemscontentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedLeague: string;

  columnsToDisplay = [
    'fName',
    'from_gem',
    'method',
    'bCost',
    'tries',
    'cost',
    'value',
    'profit',
  ];
  pageSizeOptions = [20, 50, 100, 500];
  dataSource: any;
  minMaxValues: number[];

  filterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((league) => this.dataService.getAltGemsData(league['league']))
      )
      .subscribe((res: altGemData[]) => {
        console.log('1')
        const rawProfit = res.map((gem) => gem.profit);
        const rawMin = Math.min(...rawProfit);
        const rawMax = Math.max(...rawProfit);
        this.minMaxValues = [rawMin, rawMax];
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}

// this.dataService.altGemsData$
// .pipe(take(1))
// .subscribe((res: altGemData[]) => {
//   const rawProfit = res.map((gem) => gem.profit);
//   const rawMin = Math.min(...rawProfit);
//   const rawMax = Math.max(...rawProfit);
//   this.minMaxValues = [rawMin, rawMax];
//   this.dataSource = new MatTableDataSource(res);
//   this.dataSource.paginator = this.paginator;
//   this.dataSource.sort = this.sort;
// });
