import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-filters-dropdown",
  imports: [CommonModule, CommonModule],
  templateUrl: "./filters-dropdown.component.html",
  styleUrl: "./filters-dropdown.component.css",
})
export class FiltersDropdownComponent {
  isFilterSelectionOpen = false;

  animals: string[] = [
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

  selectedAnimals = new Map<string, boolean>();

  constructor() {
    this.animals.forEach((animal) => this.selectedAnimals.set(animal, false));
  }

  toggleFilterSelection() {
    this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
  }

  toggleAnimalSelection(animal: string) {
    const currentState = this.selectedAnimals.get(animal) || false;
    this.selectedAnimals.set(animal, !currentState);
  }

  isSelected(animal: string): boolean {
    return this.selectedAnimals.get(animal) || false;
  }

  getSelectedAnimals(): string[] {
    return this.animals.filter((animal) => this.isSelected(animal));
  }

  getDropdownLabel(): string {
    const selected = this.getSelectedAnimals();
    if (selected.length === 0) return "Animals";
    if (selected.length === 1) return `${selected[0]} selected`;
    return `(${selected.length}) animal selected`;
  }
}
