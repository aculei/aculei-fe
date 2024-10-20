import { Component } from "@angular/core";
import { NgxSplideComponent, NgxSplideModule } from "ngx-splide";

@Component({
  selector: "app-archive-carousel",
  standalone: true,
  imports: [NgxSplideModule],
  templateUrl: "./archive-carousel.component.html",
  styleUrl: "./archive-carousel.component.css",
})
export class ArchiveCarouselComponent {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
}
