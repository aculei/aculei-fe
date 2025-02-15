import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersTemperatureComponent } from './filters-temperature.component';

describe('FiltersTemperatureComponent', () => {
  let component: FiltersTemperatureComponent;
  let fixture: ComponentFixture<FiltersTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersTemperatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
