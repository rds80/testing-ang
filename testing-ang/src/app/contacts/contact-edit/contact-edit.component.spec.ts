import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoriteIconDirective } from '../shared/favorite-icon/favorite-icon.directive';
import { InvalidEmailModalComponent } from '../shared/modals/invalid-email-modal/invalid-email-modal.component';
import { InvalidPhoneNumberModalComponent } from '../shared/modals/invalid-phone-number-modal/invalid-phone-number-modal.component';
import { Contact } from '../shared/models/contact.model';
import { AppMaterialModule } from '../../../app/app.material.module';
import { ContactEditComponent } from './contact-edit.component';
import { ContactService } from '../shared/services/contact.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

describe('ContactEditComponent tests', () => {
  let fixture: ComponentFixture<ContactEditComponent>;
  let component: ContactEditComponent;
  let rootElement: DebugElement;

  const contactServiceStub = {
    contact: {
      id: 1,
      name: 'janet'
    },

    save: async function(contact: Observable<Contact>) {
      component.contact = contact;
    },
    
    getContact: async function() {
      component.contact = this.contact;
      return this.contact;
    },
    
    updateContact: async function(contact: Observable<Contact>) {
      component.contact = contact;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactEditComponent, FavoriteIconDirective,
        InvalidEmailModalComponent, InvalidPhoneNumberModalComponent],
      imports: [
        AppMaterialModule,
        FormsModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [{provide: ContactService, useValue: contactServiceStub}]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [InvalidEmailModalComponent,
          InvalidPhoneNumberModalComponent]
      }
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  describe('saveContact() test', () => {
    it('should contact name after contact set', fakeAsync(() => {
      const contact = {
        id: 1,
        name: 'lorace'
      };

      component.isLoading = false;
      component.saveContact(contact);
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('lorace');
    }));
  });

  describe('loadContact() test', () => {
    it('should load contact', fakeAsync(() => {
      component.isLoading = false;
      component.loadContact();
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      console.log(nameInput);
      tick();
      expect(nameInput.nativeElement.value).toBe('janet');
    }));
  });
});
