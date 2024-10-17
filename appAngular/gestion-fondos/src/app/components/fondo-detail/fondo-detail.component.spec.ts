import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoDetailComponent } from './fondo-detail.component';

describe('FondoDetailComponent', () => {
  let component: FondoDetailComponent;
  let fixture: ComponentFixture<FondoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
