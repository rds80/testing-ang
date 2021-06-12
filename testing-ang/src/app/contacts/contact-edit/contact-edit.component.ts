import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../shared/models/contact.model';
import { ContactService } from '../shared/services/contact.service';
import { constants } from './contact-edit.constants';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { countryDialingCodes } from '../shared/phone-number/country-dialing-codes';
import { InvalidEmailModalComponent } from '../shared/modals/invalid-email-modal/invalid-email-modal.component';
import { InvalidPhoneNumberModalComponent } from '../shared/modals/invalid-phone-number-modal/invalid-phone-number-modal.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {

  public loadingContactMessage: string = constants.LOADING_CONTACT_MESSAGE;
  public noContactFoundMessage: string = constants.NO_CONTACT_FOUND_MESSAGE;
  public isLoading = true;
  public contact: Observable<Contact>;
  public countryDialingCodes: string[] = this.getKeys(countryDialingCodes);

  private modalRef: MatDialogRef<any>;

  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadContact();
  }

  ngOnDestroy(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  public saveContact(contact: Contact) {
    contact.favorite = !contact.favorite;
    this.contactService.save(contact);
  }

  public loadContact(): void {
   this.route.params.subscribe(params => {
      const id = +params['id'];
      this.isLoading = false;
      this.contact = <Observable<Contact>>this.contactService.getContact(id);

    });
  }

  public updateContact(contact: Contact): void {
    if (!this.isContactValid(contact)) {
      return;
    }

    this.displayEditSnackBar();
    this.contactService.save(contact)
  }

  getKeys(object: Object): string[] {
    return Object.keys(object).map((key, value) => key);
  }

  displayEditSnackBar(): void {
    const message = 'Contact updated';
    const snackConfig: MatSnackBarConfig = {duration: 2000};
    const actionLabel = '';

    this.snackBar.open(message, actionLabel, snackConfig);
  }

  private isEmailValid(email: string): boolean {
    return email === '' 
      || (email !== '' && email.includes('@') 
      && email.includes('.'));
  }

  private isPhoneNumberInvalid(phoneNumber: string): boolean {
    return phoneNumber === '' || (phoneNumber !== '' && phoneNumber.length === 10 && /^\d+$/.test(phoneNumber));  
  }

  private isContactValid(contact: Contact): boolean {
    if (!this.isEmailValid(contact.email)) {
      this.modalRef = this.dialog.open(InvalidEmailModalComponent);
      return false;
    }

    if (!this.isPhoneNumberInvalid(contact.number)) {
      this.modalRef = this.dialog.open(InvalidPhoneNumberModalComponent);
      return false;
    }

    return true;
  }

  
}
