import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveCarouselRowComponent } from './archive-carousel-row.component';

describe('ArchiveCarouselRowComponent', () => {
  let component: ArchiveCarouselRowComponent;
  let fixture: ComponentFixture<ArchiveCarouselRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveCarouselRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveCarouselRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
