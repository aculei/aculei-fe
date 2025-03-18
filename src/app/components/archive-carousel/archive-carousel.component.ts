import { Component, input, output } from "@angular/core";
import { NgxSplideModule } from "ngx-splide";
import { Image } from "../../pages/archive/archive.component";
import { environment } from "../../../environments/environment";
import { IMAGE_CONFIG } from "@angular/common";

@Component({
  selector: "app-archive-carousel",
  imports: [NgxSplideModule],
  templateUrl: "./archive-carousel.component.html",
  styleUrl: "./archive-carousel.component.css",
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40,
      },
    },
  ],
})
export class ArchiveCarouselComponent {
  images = input.required<Image[]>();
  imageBaseUrl = environment.imageBaseUrl;

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
}
