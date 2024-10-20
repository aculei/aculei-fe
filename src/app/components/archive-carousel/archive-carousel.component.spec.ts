import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveCarouselComponent } from './archive-carousel.component';

describe('ArchiveCarouselComponent', () => {
  let component: ArchiveCarouselComponent;
  let fixture: ComponentFixture<ArchiveCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
