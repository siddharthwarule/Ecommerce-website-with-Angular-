import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentgetwayComponent } from './paymentgetway.component';

describe('PaymentgetwayComponent', () => {
  let component: PaymentgetwayComponent;
  let fixture: ComponentFixture<PaymentgetwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentgetwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentgetwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
