import { CommonModule } from "@angular/common";
import { Component, model, output, OnInit, input } from "@angular/core";
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

  toggleFilterSelection() {
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

  changeFilter(from: number, to: number) {
    this.from.set(from);
    this.to.set(to);
  }
}
