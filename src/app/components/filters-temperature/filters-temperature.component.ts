import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: "app-filters-temperature",
    imports: [CommonModule],
    templateUrl: "./filters-temperature.component.html",
    styleUrl: "./filters-temperature.component.css"
})
export class FiltersTemperatureComponent {
  isFilterSelectionOpen = false;

  toggleFilterSelection() {
    this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
  }
}
