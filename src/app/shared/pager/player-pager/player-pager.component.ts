import { Component, Input, OnInit } from '@angular/core';
import { SearchFilterModel } from 'src/app/models/search-filter.model';

@Component({
  selector: 'app-player-pager',
  templateUrl: './player-pager.component.html',
  styleUrls: ['./player-pager.component.scss']
})
export class PlayerPagerComponent implements OnInit {
  @Input('data') data?: any;
  @Input('showHallOfFame') showHallOfFame: boolean = false;
  @Input('showBottomPagination') showBottomPagination: boolean = false;
  @Input('showTopSearch') showTopSearch: boolean = false;
  @Input('showLoader') showLoader: boolean = false;
  list?: any[];
  currentPage: number = 1;
  totalPages: number = 0;
  totalElements: number = 0;
  pageSize: number = 10;
  filters: SearchFilterModel[] = [
    {
      label: 'All',
      value: ''
    },
    {
      label: 'Street Racing',
      value: 'street-racing'
    },
    {
      label: 'Track Racing',
      value: 'track-racing'
    },
    {
      label: 'Rally Racing',
      value: 'rally-racing'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.list = this.setDataHOF();
  }

  //Method used to map the data according to the ranking, this is used to not access directly to the property data.list
  setDataHOF(): any[] | undefined {
    try {
      if (!this.data?.list) return;                                                 //if the data list is undefined return undefined
      if (!this.data?.list?.length) return [];                                      //If the data list is an empty array return another empty array
      this.currentPage = this.data?.pagination?.currentPage || 0;
      this.totalElements = this.data?.pagination?.totalElements || 0;
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);
      const l = this.data?.list.slice(0, this.pageSize);                            //We make sure there are only as many elements as required by the pageSize: 10 by default
      return l.map((d: any, i: number) => {
        return {
          ...d,
          ranking: (((this.currentPage * this.pageSize) - this.pageSize) + i) + 1   //To calculate the ranking position: We multiply the currentPage number by the pageSize
        }                                                                           //We subtract the pageSize to the result and we add the array's cuurent index number
      });                                                                           //Finally we also add 1 since arrays start on the position 0
    } catch (error) {
      return;                                                                       //If an erro occurs during the method's runtimme return undefined
    }
  }

  onNewSearchHandler(e: any) {
    console.log('onNewSearchHandler', e);
  }

}
