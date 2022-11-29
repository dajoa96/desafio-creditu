import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SearchFilterModel } from 'src/app/models/search-filter.model';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss']
})
export class SearchDropdownComponent implements OnInit, OnDestroy {
  @Input('redirectOnSearch') redirectOnSearch: boolean = true;
  @Input('filters') filters?: SearchFilterModel[];
  @Output('onNewSearch') onNewSearch: EventEmitter<any> = new EventEmitter<any>();
  currentFilter?: any;
  searchForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: [''],
      gameType: ['']
    });
  }

  ngOnInit(): void {
    this.searchParams()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  searchParams() {
    const params: any = this.route.snapshot.queryParams;
    if (params?.search && params?.search !== '') this.searchForm.get('search')?.setValue(params?.search);
    if (params?.gameType && params?.gameType !== '') {
      const found: any = this.filters?.slice().find((f) => f.value === params?.gameType?.toLowerCase());
      if (found) {
        this.currentFilter = found;
        this.searchForm.get('gameType')?.setValue(params?.gameType);
      }
    }
  }

  onSearch() {
    const search: any = this.searchForm.get('gameType')?.value ? this.searchForm.value : { search: this.searchForm.get('search')?.value };
    this.router.navigate(['/search'], { queryParams: search });
  }

  onSelect(val: any) {
    if (!val) return;
    this.currentFilter = val;
    this.searchForm.get('gameType')?.setValue(this.currentFilter.value);
    this.onSearch();
  }

}
