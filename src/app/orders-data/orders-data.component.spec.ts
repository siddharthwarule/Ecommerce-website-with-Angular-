import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDataComponent } from './orders-data.component';

describe('OrdersDataComponent', () => {
  let component: OrdersDataComponent;
  let fixture: ComponentFixture<OrdersDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
