import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlayerPagerComponent } from './pager/player-pager/player-pager.component';
import { SearchDropdownComponent } from './search/search-dropdown/search-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckDialogModalComponent } from './modal/check-dialog-modal/check-dialog-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PlayerPagerComponent,
    SearchDropdownComponent,
    CheckDialogModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    PlayerPagerComponent,
    SearchDropdownComponent,
    CheckDialogModalComponent
  ]
})
export class SharedModule { }
