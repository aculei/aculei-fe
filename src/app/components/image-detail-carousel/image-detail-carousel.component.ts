import { NgOptimizedImage } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  model,
  OnInit,
  viewChild,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgxSplideComponent, NgxSplideModule } from "ngx-splide";
import { environment } from "../../../environments/environment";
import Splide from "@splidejs/splide";
import { Image } from "../../pages/archive/archive.component";

@Component({
  selector: "app-image-detail-carousel",
  imports: [NgxSplideModule, RouterLink, NgOptimizedImage],
  templateUrl: "./image-detail-carousel.component.html",
  styleUrl: "./image-detail-carousel.component.css",
})
export class ImageDetailCarouselComponent implements OnInit {
  images = model<Image[] | undefined>(undefined);
  imageCurrentIndex = model<number | undefined>(undefined);
  imageBaseUrl = environment.imageBaseUrl;

  splide = viewChild<NgxSplideComponent>("splide");

  closeImageDetail() {
    this.images.set(undefined);
    this.imageCurrentIndex.set(undefined);
  }

  ngOnInit() {
    this.splide()
      ?.getSplideInstance()
      .on("ready", () => {
        this.splide()
          ?.getSplideInstance()
          .go(this.imageCurrentIndex() || 2);
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.splide()?.getSplideInstance().go(this.imageCurrentIndex()!);
      console.log(this.imageCurrentIndex());
    }, 100);
  }
}
