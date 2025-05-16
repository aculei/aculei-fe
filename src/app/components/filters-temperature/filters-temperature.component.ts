import { CommonModule } from "@angular/common";
import {
  Component,
  model,
  output,
  OnInit,
  input,
  ElementRef,
  HostListener,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { combineLatest, debounce, distinctUntilChanged, interval } from "rxjs";
import { Image } from "../../pages/archive/archive.component";

export interface FiltersTemperatureFromTo {
  from: number;
  to: number;
}
@Component({
  selector: "app-filters-temperature",
  imports: [CommonModule, FormsModule],
  templateUrl: "./filters-temperature.component.html",
  styleUrl: "./filters-temperature.component.css",
})
export class FiltersTemperatureComponent implements OnInit {
  selectedImageFilters = input<Image | undefined>();
  isFilterSelectionOpen = false;
  lowerBound = input<number>(0);
  upperBound = input<number>(34);

  from = model<number>(this.lowerBound());
  from$ = toObservable(this.from);
  to = model<number>(this.upperBound());
  to$ = toObservable(this.to);

  temperatureFromToFilters = model<{
    from: number;
    to: number;
  }>();

  isTouch = false;
  touchStartTime = 0;
  touchStartX = 0;
  touchStartY = 0;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    combineLatest([this.from$, this.to$])
      .pipe(
        debounce(() => interval(250)),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.temperatureFromToFilters.set({ from: this.from(), to: this.to() });
      });
  }

  @HostListener("document:click", ["$event"])
  @HostListener("document:touchend", ["$event"])
  onClickOutside(event: Event) {
    if (
      this.isFilterSelectionOpen &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.isFilterSelectionOpen = false;
    }
  }

  handleDropdownOpen() {
    if (!this.selectedImageFilters()) {
      this.isFilterSelectionOpen = true;
    }
  }

  handleDropdownClose() {
    if (!this.selectedImageFilters() && !this.isTouch) {
      this.isFilterSelectionOpen = false;
    }
  }

  handleTouchStart(event: TouchEvent) {
    this.isTouch = true;
    this.touchStartTime = new Date().getTime();
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
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
      this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
    }
  }

  onFromChange() {
    this.temperatureFromToFilters.set({ from: this.from(), to: this.to() });
  }

  onToChange() {
    this.temperatureFromToFilters.set({ from: this.from(), to: this.to() });
  }

  changeFilter(from: number, to: number, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.from.set(from);
    this.to.set(to);
    this.isFilterSelectionOpen = false;
  }

  handleOptionTouch(event: Event, from: number, to: number) {
    event.preventDefault();
    event.stopPropagation();
    this.changeFilter(from, to);
  }
}