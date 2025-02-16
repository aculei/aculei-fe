import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RangeDatePickerComponent } from "../range-date-picker/range-date-picker.component";

@Component({
  selector: "app-filters-datepicker",
  imports: [CommonModule, RangeDatePickerComponent],
  templateUrl: "./filters-datepicker.component.html",
  styleUrl: "./filters-datepicker.component.css",
})
export class FiltersDatepickerComponent {
  isFilterSelectionOpen = false;

  toggleFilterSelection() {
    this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
  }
}
