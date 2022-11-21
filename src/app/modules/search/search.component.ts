import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  paramsSub$?: Subscription;
  params?: any;
  showLoader: boolean = true;
  data: any = {
    list: [
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' },
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' },
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' },
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' },
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' },
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' },
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' },
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' },
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' },
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' },
      { id: 1, gameType: 'Rally Racing', nickname: 'jp1995' }
    ],
    pagination: {
      currentPage: 1,
      totalElements: 15
    }
  }

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paramsSub$ = this.route.queryParams.subscribe(p => {
      this.params = p;
      this.onNewParams();
    });
  }

  ngOnDestroy(): void {
    this.paramsSub$?.unsubscribe();
  }

  onNewParams() {
    console.log('buscar', this.params);
  }

}
