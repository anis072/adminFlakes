import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquilleuseComponent } from './maquilleuse.component';

describe('MaquilleuseComponent', () => {
  let component: MaquilleuseComponent;
  let fixture: ComponentFixture<MaquilleuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaquilleuseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquilleuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
