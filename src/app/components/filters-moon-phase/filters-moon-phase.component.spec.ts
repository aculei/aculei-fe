import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersMoonPhaseComponent } from './filters-moon-phase.component';

describe('FiltersMoonPhaseComponent', () => {
  let component: FiltersMoonPhaseComponent;
  let fixture: ComponentFixture<FiltersMoonPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersMoonPhaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersMoonPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
