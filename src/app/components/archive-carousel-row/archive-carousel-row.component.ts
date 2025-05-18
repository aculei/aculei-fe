import {
  AfterViewInit,
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
export class ArchiveCarouselRowComponent implements AfterViewInit {
  @ViewChild("carousel") carouselElement!: ElementRef;

  images = input.required<Image[]>();
  imageClick = output<{
    images: Image[];
    index: number;
  }>();

  imageBaseUrl = environment.imageBaseUrl;

  // Drag scrolling properties
  private isMouseDown = false;
  private startX = 0;
  private scrollLeft = 0;
  private hasMoved = false;

  ngAfterViewInit(): void {
    this.setupMouseDragScrolling();
  }

  onImageClick(image: Image) {
    // Only trigger click if user didn't drag
    if (!this.hasMoved) {
      this.imageClick.emit({
        images: this.images(),
        index: this.images().indexOf(image),
      });
    }
  }

  setupMouseDragScrolling(): void {
    const carousel = this.carouselElement.nativeElement;

    // Mouse down event - start dragging
    carousel.addEventListener("mousedown", (e: MouseEvent) => {
      this.isMouseDown = true;
      this.hasMoved = false;
      this.startX = e.pageX - carousel.offsetLeft;
      this.scrollLeft = carousel.scrollLeft;
      carousel.classList.add("grabbing");
      e.preventDefault();
    });

    // Mouse move event - handle dragging
    carousel.addEventListener("mousemove", (e: MouseEvent) => {
      if (!this.isMouseDown) return;

      const x = e.pageX - carousel.offsetLeft;
      const distance = x - this.startX;

      // Only mark as moved if significant movement occurred
      // (to prevent slight movements from canceling clicks)
      if (Math.abs(distance) > 5) {
        this.hasMoved = true;
      }

      carousel.scrollLeft = this.scrollLeft - distance;
      e.preventDefault();
    });

    // Mouse up event - stop dragging
    carousel.addEventListener("mouseup", () => {
      this.isMouseDown = false;
      carousel.classList.remove("grabbing");
    });

    // Mouse leave event - stop dragging if pointer leaves carousel
    carousel.addEventListener("mouseleave", () => {
      if (this.isMouseDown) {
        this.isMouseDown = false;
        carousel.classList.remove("grabbing");
      }
    });

    // Prevent click events when dragging
    const images = carousel.querySelectorAll("img");
    images.forEach((img: HTMLImageElement) => {
      img.addEventListener("mousedown", (e: MouseEvent) => {
        // Prevent default drag behavior of images
        e.preventDefault();
      });
    });
  }
}