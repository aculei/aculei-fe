import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveImageCarouselComponent } from './archive-image-carousel.component';

describe('ArchiveImageCarouselComponent', () => {
  let component: ArchiveImageCarouselComponent;
  let fixture: ComponentFixture<ArchiveImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveImageCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
