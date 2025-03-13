import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailCarouselComponent } from './image-detail-carousel.component';

describe('ImageDetailCarouselComponent', () => {
  let component: ImageDetailCarouselComponent;
  let fixture: ComponentFixture<ImageDetailCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageDetailCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDetailCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
