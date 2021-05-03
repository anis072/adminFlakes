import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquManagmentComponent } from './maqu-managment.component';

describe('MaquManagmentComponent', () => {
  let component: MaquManagmentComponent;
  let fixture: ComponentFixture<MaquManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaquManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
