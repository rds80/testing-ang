import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvalidEmailModalComponent } from './contacts/shared/modals/invalid-email-modal/invalid-email-modal.component';
import { InvalidPhoneNumberModalComponent } from './contacts/shared/modals/invalid-phone-number-modal/invalid-phone-number-modal.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactService } from './contacts/shared/services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    InvalidEmailModalComponent,
    InvalidPhoneNumberModalComponent,
    ContactEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
