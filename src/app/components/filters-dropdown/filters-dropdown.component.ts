import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  Host,
  HostListener,
  OnInit,
  input,
  model,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { combineLatest, distinctUntilChanged } from "rxjs";
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
  isFilterSelectionOpen = model(false);
  touchStartTime = 0;
  touchStartX = 0;
  touchStartY = 0;

  touchTimeout: any = null;

  isTouch = false;

  @HostListener("click", ["$event"])
  @HostListener("document:touchend", ["$event"])
  onClickOutside(event: Event) {
    if (
      this.isFilterSelectionOpen &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.isFilterSelectionOpen.set(false);
    }
  }

  ngOnInit() {
    combineLatest([this.selectedAnimalsFilters$])
      .pipe(distinctUntilChanged())
      .subscribe(() => {});
  }

  constructor(private elementRef: ElementRef) {
    this.animals()?.forEach((animal) =>
      this.selectedAnimals.set(animal, false)
    );
  }

  handleDropdownOpen() {
    if (!this.selectedImageFilters()?.top_predictions) {
      this.isFilterSelectionOpen.set(true);
    }
  }

  handleDropdownClose() {
    if (!this.selectedImageFilters()?.top_predictions && !this.isTouch) {
      this.isFilterSelectionOpen.set(false);
    }
  }

  handleTouchStart(event: TouchEvent) {
    this.isTouch = true;
    this.touchStartTime = new Date().getTime();
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  handleTouchEnd(event: TouchEvent) {
    if (!(event.target as HTMLElement).closest('[role="none"]')) {
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

  toggleFilterSelection(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedImageFilters() == undefined) {
      this.isFilterSelectionOpen.set(!this.isFilterSelectionOpen());
    }
  }

  selectAnimal(event: Event, animal: string) {
    event.preventDefault();
    event.stopPropagation();

    this.toggleAnimalSelection(animal);

    if (this.isTouch) {
      event.stopPropagation();
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
