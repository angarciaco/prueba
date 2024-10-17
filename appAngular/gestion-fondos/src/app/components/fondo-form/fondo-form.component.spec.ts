import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoFormComponent } from './fondo-form.component';

describe('FondoFormComponent', () => {
  let component: FondoFormComponent;
  let fixture: ComponentFixture<FondoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
