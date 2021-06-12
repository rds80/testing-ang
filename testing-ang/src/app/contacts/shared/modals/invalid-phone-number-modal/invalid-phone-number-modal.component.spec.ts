import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidPhoneNumberModalComponent } from './invalid-phone-number-modal.component';

describe('InvalidPhoneNumberModalComponent', () => {
  let component: InvalidPhoneNumberModalComponent;
  let fixture: ComponentFixture<InvalidPhoneNumberModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidPhoneNumberModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidPhoneNumberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
