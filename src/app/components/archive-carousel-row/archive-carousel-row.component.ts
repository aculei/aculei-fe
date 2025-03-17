import {
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  Input,
  input,
  Output,
  output,
  signal,
  ViewChild,
  viewChild,
} from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Image } from "../../pages/archive/archive.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-archive-carousel-row",
  imports: [CommonModule],
  templateUrl: "./archive-carousel-row.component.html",
  styleUrl: "./archive-carousel-row.component.css",
})
export class ArchiveCarouselRowComponent {
  @ViewChild("carousel") carouselElement!: ElementRef;
  images = input.required<Image[]>();

  imageClick = output<{
    images: Image[];
    index: number;
  }>();

  onImageClick(image: Image) {
    this.imageClick.emit({
      images: this.images(),
      index: this.images().indexOf(image),
    });
  }

  imageBaseUrl = environment.imageBaseUrl;
  private scrollInterval: any;
  private scrollSpeed = 1.5;
  private isHovering = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.clearScrollInterval();
  }

  onMouseOver(): void {
    this.isHovering = true;
    this.startAutoScroll();
  }

  onMouseLeave(): void {
    this.isHovering = false;
    this.clearScrollInterval();
  }

  startAutoScroll(): void {
    this.clearScrollInterval();
    this.scrollInterval = setInterval(() => {
      if (!this.carouselElement || !this.isHovering) return;
      const carousel = this.carouselElement.nativeElement;
      carousel.scrollLeft += this.scrollSpeed;

      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
        carousel.scrollLeft = 0;
      }
    }, 16);
  }

  clearScrollInterval(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }
}
