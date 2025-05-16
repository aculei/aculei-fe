import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxSectionComponent } from './parallax-section.component';

describe('ParallaxSectionComponent', () => {
  let component: ParallaxSectionComponent;
  let fixture: ComponentFixture<ParallaxSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParallaxSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParallaxSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
