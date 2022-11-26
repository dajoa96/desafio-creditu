import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-check-dialog-modal',
  templateUrl: './check-dialog-modal.component.html',
  styleUrls: ['./check-dialog-modal.component.scss']
})
export class CheckDialogModalComponent implements OnInit {
  @Input('title') title?: string;
  @Input('content') content?: string;
  @Input('accept') accept?: string;
  @Input('button') button?: string;
  @Input('buttonClass') buttonClass?: string;
  acceptCheckbox: boolean = false;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
