import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  input,
  model,
  output,
} from "@angular/core";
import { Image } from "../../pages/archive/archive.component";
import { DateRangePickerComponent } from "../date-range-picker/date-range-picker.component";

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

  isTouch = false;
  touchStartTime = 0;

  constructor(private elementRef: ElementRef) {}

  @HostListener("document:click", ["$event"])
  @HostListener("document:touchend", ["$event"])
  onClickOutside(event: Event) {
    if (
      this.isFilterSelectionOpen() &&
      !this.elementRef.nativeElement.contains(event.target) &&
      !this.pickerOpened()
    ) {
      this.isFilterSelectionOpen.set(false);
    }
  }

  handleTouchStart(event: TouchEvent) {
    this.isTouch = true;
    this.touchStartTime = new Date().getTime();
  }

  handleTouchEnd(event: TouchEvent) {
    if (!(event.target as HTMLElement).closest('[role="menu"]')) {
      const touchEndTime = new Date().getTime();
      const touchDuration = touchEndTime - this.touchStartTime;

      if (touchDuration < 300) {
        this.toggleFilterSelection(event);
      }
    }

    setTimeout(() => {
      this.isTouch = false;
    }, 300);
  }

  toggleFilterSelection(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.selectedImageFilters() == undefined) {
      this.isFilterSelectionOpen.set(!this.isFilterSelectionOpen());
    }
  }

  setFirstYear() {
    this.start.set(new Date(2021, 0, 1));
    this.end.set(new Date(2021, 0, 31));
    this.dateChange.emit(true);
    this.isFilterSelectionOpen.set(false);
  }

  setThisYear() {
    const currentYear = new Date().getFullYear();
    this.start.set(new Date(currentYear, 0, 1));
    this.end.set(new Date(currentYear, 11, 31));
    this.dateChange.emit(true);
    this.isFilterSelectionOpen.set(false);
  }

  removeFilter() {
    this.start.set(undefined);
    this.end.set(undefined);
    this.dateChange.emit(true);
    this.isFilterSelectionOpen.set(false);
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
    if (
      !this.selectedImageFilters()?.date &&
      !this.pickerOpened() &&
      !this.isTouch
    ) {
      this.isFilterSelectionOpen.set(false);
    }
  }

  handleOptionTouch(event: Event, action: () => void) {
    event.preventDefault();
    event.stopPropagation();
    action();
  }
}