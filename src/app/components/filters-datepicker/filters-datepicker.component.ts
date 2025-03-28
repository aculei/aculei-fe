import { CommonModule } from "@angular/common";
import { Component, input, model, output, signal } from "@angular/core";
import { DateRangePickerComponent } from "../date-range-picker/date-range-picker.component";
import { Image } from "../../pages/archive/archive.component";

@Component({
  selector: "app-filters-datepicker",
  imports: [CommonModule, DateRangePickerComponent],
  templateUrl: "./filters-datepicker.component.html",
  styleUrl: "./filters-datepicker.component.css",
})
export class FiltersDatepickerComponent {
  selectedImageFilters = input<Image | undefined>();
  isFilterSelectionOpen = model<boolean>(false);
  pickerOpened = model<boolean>(false);
  start = model<Date | undefined>();
  end = model<Date | undefined>();
  dateChange = output<boolean>();

  toggleFilterSelection() {
    // if (this.selectedImageFilters() == undefined) {
    //   this.isFilterSelectionOpen.set(!this.isFilterSelectionOpen());
    // }
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
    this.dateChange.emit(true);
    this.toggleFilterSelection();
  }

  onDateChange() {
    this.dateChange.emit(true);
  }

  onMouseEnter() {
    if (!this.selectedImageFilters()?.date) {
      this.isFilterSelectionOpen.set(true);
    }
  }

  onMouseLeave() {
    console.log(this.pickerOpened());
    if (!this.selectedImageFilters()?.date && !this.pickerOpened()) {
      this.isFilterSelectionOpen.set(false);
    }
  }
}
