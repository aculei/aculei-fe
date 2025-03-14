import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailVideoComponent } from './image-detail-video.component';

describe('ImageDetailVideoComponent', () => {
  let component: ImageDetailVideoComponent;
  let fixture: ComponentFixture<ImageDetailVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageDetailVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDetailVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
