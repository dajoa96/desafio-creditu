import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  paramsSub$?: Subscription;
  params?: any;
  showLoader: boolean = false;
  bhData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  data: any = {
    list: [],
    pagination: {
      currentPage: 1,
      totalElements: 0
    }
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
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

  async onNewParams() {
    this.showLoader = true;
    let searchParams: any = { page: this.data.pagination.currentPage }
    if (this.params?.search && this.params?.search !== '') searchParams.search = this.params?.search;
    if (this.params?.gameType && this.params?.gameType !== '') searchParams.gameType = this.params?.gameType;
    try {
      const res = await firstValueFrom(this.userService.getUsers(searchParams));         //Here we use an await promise to simplify the fetching process
      if (res.status.toLowerCase() === 'success' && Array.isArray(res.data.users)) {     //So we can wait for the data to be available
        this.data.list = res.data.users;
        this.data.pagination = res.data.pagination;
        this.bhData.next(this.data);
      }
      this.showLoader = false;
    } catch (error) {
      this.showLoader = false;
    }
  }

  onNewPageHandler(page: number) {
    if (typeof page !== 'number') return;
    this.data.pagination.currentPage = page;
    this.onNewParams();
  }

}
