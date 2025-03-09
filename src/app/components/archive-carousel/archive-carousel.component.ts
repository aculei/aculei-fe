import { Component, input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgxSplideComponent, NgxSplideModule } from "ngx-splide";
import { Image } from "../../pages/archive/archive.component";

@Component({
  selector: "app-archive-carousel",
  imports: [NgxSplideModule, RouterLink],
  templateUrl: "./archive-carousel.component.html",
  styleUrl: "./archive-carousel.component.css",
})
export class ArchiveCarouselComponent {
  images = input<Image[]>();
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
}
