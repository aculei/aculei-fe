import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersDatepickerComponent } from './filters-datepicker.component';

describe('FiltersDatepickerComponent', () => {
  let component: FiltersDatepickerComponent;
  let fixture: ComponentFixture<FiltersDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
