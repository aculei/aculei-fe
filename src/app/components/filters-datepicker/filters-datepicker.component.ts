import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-filters-datepicker",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./filters-datepicker.component.html",
  styleUrl: "./filters-datepicker.component.css",
})
export class FiltersDatepickerComponent {
  isFilterSelectionOpen = false;

  toggleFilterSelection() {
    this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
  }
}
