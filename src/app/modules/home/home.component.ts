import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoader = false;
    }, 1500);
  }

}
