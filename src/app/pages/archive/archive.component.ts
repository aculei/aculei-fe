import { Component } from "@angular/core";
import { ArchiveCarouselComponent } from "../../components/archive-carousel/archive-carousel.component";

@Component({
  selector: "app-archive",
  standalone: true,
  imports: [ArchiveCarouselComponent],
  templateUrl: "./archive.component.html",
  styleUrl: "./archive.component.css",
})
export class ArchiveComponent {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
