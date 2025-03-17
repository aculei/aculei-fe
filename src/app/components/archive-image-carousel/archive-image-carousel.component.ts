import { Component, model, OnInit } from "@angular/core";
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
  }

  nextImage() {
    if (this.images()?.length) {
      this.imageCurrentIndex.set(
        (this.imageCurrentIndex()! + 1) % this.images()!.length
      );
    }
  }

  closeImageDetail() {
    this.images.set(undefined);
    this.imageCurrentIndex.set(undefined);
    this.selectedImageFilters.set(undefined);
  }
}
