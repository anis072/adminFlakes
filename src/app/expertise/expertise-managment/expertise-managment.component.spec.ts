import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseManagmentComponent } from './expertise-managment.component';

describe('ExpertiseManagmentComponent', () => {
  let component: ExpertiseManagmentComponent;
  let fixture: ComponentFixture<ExpertiseManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertiseManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertiseManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
