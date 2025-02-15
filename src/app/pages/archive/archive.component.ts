import { Component } from "@angular/core";
import { ArchiveCarouselComponent } from "../../components/archive-carousel/archive-carousel.component";
import { FiltersDropdownComponent } from "../../components/filters-dropdown/filters-dropdown.component";
import { FiltersDatepickerComponent } from "../../components/filters-datepicker/filters-datepicker.component";
import { FiltersTemperatureComponent } from "../../components/filters-temperature/filters-temperature.component";

@Component({
  selector: "app-archive",
  standalone: true,
  imports: [
    ArchiveCarouselComponent,
    FiltersDropdownComponent,
    FiltersDatepickerComponent,
    FiltersTemperatureComponent,
  ],
  templateUrl: "./archive.component.html",
  styleUrl: "./archive.component.css",
})
export class ArchiveComponent {
  isAnimalFilterOpen = false;
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
