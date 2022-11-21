import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchFilterModel } from 'src/app/models/search-filter.model';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss']
})
export class SearchDropdownComponent implements OnInit {
  @Input('redirectOnSearch') redirectOnSearch: boolean = true;
  @Input('filters') filters?: SearchFilterModel[];
  @Output('onNewSearch') onNewSearch: EventEmitter<any> = new EventEmitter<any>();
  currentFilter?: any;
  searchForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: [''],
      gameType: ['']
    });
  }

  ngOnInit(): void {
  }

  onSearch() {
    const search: any = this.searchForm.get('gameType')?.value ? this.searchForm.value : { search: this.searchForm.get('search')?.value };
    this.router.navigate(['/search'], { queryParams: search });
    // if (this.redirectOnSearch && !this.router.url.includes('/search')) {
    //   return;
    // } else {
    //   this.onNewSearch.emit(search);
    // }
  }

  onSelect(val: any) {
    if (!val) return;
    this.currentFilter = val;
    this.searchForm.get('gameType')?.setValue(this.currentFilter.value)
  }

}
