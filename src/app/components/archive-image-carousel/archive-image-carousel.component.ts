import { Component, HostListener, model, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Image } from "../../pages/archive/archive.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-archive-image-carousel",
  imports: [CommonModule],
  templateUrl: "./archive-image-carousel.component.html",
  styleUrl: "./archive-image-carousel.component.css",
})
export class ArchiveImageCarouselComponent implements OnInit {
  images = model<Image[] | undefined>(undefined);
  imageCurrentIndex = model<number>();
  selectedImageFilters = model<Image | undefined>();
  imageBaseUrl = environment.imageBaseUrl;

  ngOnInit() {
    if (!this.imageCurrentIndex() && this.images()?.length) {
      this.imageCurrentIndex.set(0);
    }
  }

  prevImage() {
    if (this.images()?.length) {
      this.imageCurrentIndex.set(
        (this.imageCurrentIndex()! - 1 + this.images()!.length) %
          this.images()!.length
      );
    }

    const currentIndex = this.imageCurrentIndex();
    if (currentIndex !== undefined && this.images()) {
      this.selectedImageFilters.set(this.images()![currentIndex]);
    }
  }

  nextImage() {
    if (this.images()?.length) {
      this.imageCurrentIndex.set(
        (this.imageCurrentIndex()! + 1) % this.images()!.length
      );
    }

    const currentIndex = this.imageCurrentIndex();
    if (currentIndex !== undefined && this.images()) {
      this.selectedImageFilters.set(this.images()![currentIndex]);
    }
  }

  closeImageDetail() {
    this.images.set(undefined);
    this.imageCurrentIndex.set(undefined);
    this.selectedImageFilters.set(undefined);
  }

  handleImageClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const rect = element.getBoundingClientRect();
    const xPos = event.clientX - rect.left;

    if (element.clientWidth / 2 >= xPos) {
      this.prevImage();
    } else {
      this.nextImage();
    }
  }

  @HostListener("document:keydown.escape", ["$event"])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeImageDetail();
  }

  @HostListener("document:keydown.arrowleft", ["$event"])
  handleArrowLeftKey(event: KeyboardEvent) {
    this.prevImage();
  }

  @HostListener("document:keydown.arrowright", ["$event"])
  handleArrowRightKey(event: KeyboardEvent) {
    this.nextImage();
  }
}
