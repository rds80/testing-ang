import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { constants } from '../modal.constants';

@Component({
  selector: 'app-invalid-phone-number-modal',
  templateUrl: './invalid-phone-number-modal.component.html',
  styleUrls: ['./invalid-phone-number-modal.component.css']
})
export class InvalidPhoneNumberModalComponent implements OnInit {
  invalidPhoneNumberMessage = constants.INVALID_PHONE_NUMBER_MESSAGE;

  constructor(public dialogRef: MatDialogRef<InvalidPhoneNumberModalComponent>) { }

  ngOnInit(): void {
  }

}
