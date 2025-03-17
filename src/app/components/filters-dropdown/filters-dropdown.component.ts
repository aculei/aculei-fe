import { CommonModule } from "@angular/common";
import { Component, model, output, OnInit, input } from "@angular/core";
import { combineLatest, debounce, distinctUntilChanged, interval } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { Image } from "../../pages/archive/archive.component";
export interface SelectedAnimalsFilters {
  animals: string[] | undefined;
}

@Component({
  selector: "app-filters-dropdown",
  imports: [CommonModule, CommonModule],
  templateUrl: "./filters-dropdown.component.html",
  styleUrl: "./filters-dropdown.component.css",
})
export class FiltersDropdownComponent implements OnInit {
  selectedImageFilters = input<Image | undefined>();
  animals = input<string[] | undefined>();
  selectedAnimalsFilters = model<SelectedAnimalsFilters | undefined>({
    animals: [],
  });
  selectedAnimalsFilters$ = toObservable(this.selectedAnimalsFilters);
  selectedAnimals = new Map<string, boolean>();
  isFilterSelectionOpen = false;

  ngOnInit() {
    combineLatest([this.selectedAnimalsFilters$])
      .pipe(distinctUntilChanged())
      .subscribe(() => {});
  }

  constructor() {
    this.animals()?.forEach((animal) =>
      this.selectedAnimals.set(animal, false)
    );
  }

  toggleFilterSelection() {
    if (this.selectedImageFilters() == undefined) {
      this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
    }
  }

  toggleAnimalSelection(animal: string) {
    const currentState = this.selectedAnimals.get(animal) || false;
    this.selectedAnimals.set(animal, !currentState);
    this.selectedAnimalsFilters.set({ animals: this.getSelectedAnimals() });
  }

  isSelected(animal: string): boolean {
    return this.selectedAnimals.get(animal) || false;
  }

  getSelectedAnimals(): string[] | undefined {
    return this.animals()?.filter((animal) => this.isSelected(animal));
  }

  getDropdownLabel(): string {
    const selected = this.getSelectedAnimals();
    if (selected?.length === 0) return "Animals";
    if (selected?.length === 1) return `${selected[0]} selected`;
    return `(${selected?.length}) animal selected`;
  }
}
