import { CommonModule } from "@angular/common";
import { Component, model, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ClickOutsideDirective } from "../../directive/click-outside.directive";

@Component({
  selector: "app-filters-temperature",
  imports: [CommonModule, FormsModule],
  templateUrl: "./filters-temperature.component.html",
  styleUrl: "./filters-temperature.component.css",
})
export class FiltersTemperatureComponent {
  isFilterSelectionOpen = false;

  from = model<number | undefined>();
  to = model<number | undefined>();

  temperatureChange = output<boolean>();

  toggleFilterSelection() {
    this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
  }

  onFromChange() {
    this.temperatureChange.emit(true);
  }

  applyFilter(type: "below" | "above" | "entire") {
    switch (type) {
      case "below":
        this.from.set(undefined);
        this.to.set(0);
        break;
      case "above":
        this.from.set(0);
        this.to.set(undefined);
        break;
      case "entire":
        this.from.set(undefined);
        this.to.set(undefined);
        break;
    }
  }
}
