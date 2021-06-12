import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidEmailModalComponent } from './invalid-email-modal.component';

describe('InvalidEmailModalComponent', () => {
  let component: InvalidEmailModalComponent;
  let fixture: ComponentFixture<InvalidEmailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidEmailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
