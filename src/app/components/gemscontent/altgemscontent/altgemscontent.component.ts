import { OnInit, ViewChild, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { DataService } from 'src/app/services/data.service';

import { combinedAltGemData } from 'src/app/types';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-altgemscontent',
  templateUrl: './altgemscontent.component.html',
  styleUrls: ['./altgemscontent.component.scss'],
})
export class AltGemscontentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
  lensValues: any;

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
      .subscribe((res: combinedAltGemData) => {
        const rawProfit = res.gemData.map((gem) => gem.profit);
        const rawMin = Math.min(...rawProfit);
        const rawMax = Math.max(...rawProfit);
        this.minMaxValues = [rawMin, rawMax];
        this.lensValues = res.lensValues;
        this.dataSource = new MatTableDataSource(res.gemData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
