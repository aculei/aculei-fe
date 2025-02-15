import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-filters-dropdown",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./filters-dropdown.component.html",
  styleUrl: "./filters-dropdown.component.css",
})
export class FiltersDropdownComponent {
  isFilterSelectionOpen = false;
  filters = [
    "Badger",
    "Buzzard",
    "Cat",
    "Dog",
    "Fox",
    "Horse",
    "Rabbit",
    "Rat",
    "Squirrel",
    "Weasel",
  ];

  toggleFilterSelection() {
    this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
  }
}
