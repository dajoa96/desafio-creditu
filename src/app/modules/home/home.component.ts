import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, first, firstValueFrom, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showLoader: boolean = true;
  bhData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  data: any = {
    list: [],
    pagination: {
      currentPage: 1,
      totalElements: 0
    }
  }

  constructor(
    private readonly userService: UserService
  ) { }

  async ngOnInit() {                                                                      //Since we use a await operator we must add the async to the ngOnInit() Method
    this.showLoader = true;
    try {
      const res = await firstValueFrom(this.userService.getTopRanking());                 //Here we use an await promise to simplify the fetching process
      if (res.status.toLowerCase() === 'success' && Array.isArray(res.data.user)) {       //So we can wait for the data to be available
        this.data.list = res.data.user;
        this.data.pagination = this.data.pagination;
        this.bhData.next(this.data);
      }
      this.showLoader = false;
    } catch (error) {
      this.showLoader = false;
    }
  }

}
