import { CommonModule } from "@angular/common";
import { Component, model, output } from "@angular/core";
import { DateRangePickerComponent } from "../date-range-picker/date-range-picker.component";

@Component({
  selector: "app-filters-datepicker",
  imports: [CommonModule, DateRangePickerComponent],
  templateUrl: "./filters-datepicker.component.html",
  styleUrl: "./filters-datepicker.component.css",
})
export class FiltersDatepickerComponent {
  isFilterSelectionOpen = false;
  start = model<Date | undefined>();
  end = model<Date | undefined>();
  dateChange = output<boolean>();

  toggleFilterSelection() {
    this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
  }

  setFirstYear() {
    this.start.set(new Date(2021, 0, 1));
    this.end.set(new Date(2021, 0, 31));
    this.dateChange.emit(true);
    this.toggleFilterSelection();
  }

  setSecondYear() {
    this.start.set(new Date(2021, 1, 1));
    this.end.set(new Date(2021, 1, 28));
    this.dateChange.emit(true);
    this.toggleFilterSelection();
  }

  removeFilter() {
    this.start.set(undefined);
    this.end.set(undefined);
    this.toggleFilterSelection();
  }

  onDateChange() {
    this.dateChange.emit(true);
  }
}
