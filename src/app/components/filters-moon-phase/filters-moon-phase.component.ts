import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  input,
  model,
} from "@angular/core";
import { Image } from "../../pages/archive/archive.component";

export interface MoonPhase {
  id: number;
  name: string;
  imageSvg: string;
}

export interface SelectedMoonPhaseFilters {
  moonPhases: string[] | undefined;
}

@Component({
  selector: "app-filters-moon-phase",
  imports: [CommonModule],
  templateUrl: "./filters-moon-phase.component.html",
  styleUrl: "./filters-moon-phase.component.css",
})
export class FiltersMoonPhaseComponent {
  isFilterSelectionOpen = false;
  selectedImageFilters = input<Image | undefined>();

  selectedMoonPhasesFilters = model<SelectedMoonPhaseFilters | undefined>({
    moonPhases: [],
  });

  moonPhases: MoonPhase[] = [
    { id: 1, name: "New Moon", imageSvg: "assets/svg/new-moon.svg" },
    {
      id: 2,
      name: "Waxing Crescent",
      imageSvg: "assets/svg/first-quarter.svg",
    },
    {
      id: 3,
      name: "First Quarter",
      imageSvg: "assets/svg/first-quarter.svg",
    },
    {
      id: 4,
      name: "Waxing Gibbous",
      imageSvg: "assets/svg/waxing-gibbous.svg",
    },
    { id: 5, name: "Full Moon", imageSvg: "assets/svg/full-moon.svg" },
    {
      id: 6,
      name: "Waning Gibbous",
      imageSvg: "assets/svg/waning-gibbous.svg",
    },
    { id: 7, name: "Last Quarter", imageSvg: "assets/svg/last-quarter.svg" },
    {
      id: 8,
      name: "Waning Crescent",
      imageSvg: "assets/svg/waning-crescent.svg",
    },
  ];

  selectedMoonPhases = new Map<number, boolean>();

  isTouch = false;
  touchStartTime = 0;
  touchStartX = 0;
  touchStartY = 0;

  constructor(private elementRef: ElementRef) {}

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
    if (!this.selectedImageFilters()?.moon_phase) {
      this.isFilterSelectionOpen = true;
    }
  }

  handleDropdownClose() {
    if (!this.selectedImageFilters()?.moon_phase && !this.isTouch) {
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

    if (this.selectedImageFilters()?.moon_phase === undefined) {
      this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
    }
  }

  getIconFromName(name: string): string {
    return this.moonPhases.find((phase) => phase.name === name)?.imageSvg || "";
  }

  toggleMoonPhase(phase: MoonPhase, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const isSelected = this.selectedMoonPhases.get(phase.id) || false;
    this.selectedMoonPhases.set(phase.id, !isSelected);
    this.selectedMoonPhasesFilters.set({
      moonPhases: this.getSelectedMoonPhases().map((phase) => phase.name),
    });
  }

  handleOptionTouch(event: Event, phase: MoonPhase) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleMoonPhase(phase);
  }

  isSelected(phase: MoonPhase): boolean {
    return this.selectedMoonPhases.get(phase.id) || false;
  }

  getSelectedMoonPhases(): MoonPhase[] {
    return this.moonPhases
      .filter((phase) => this.selectedMoonPhases.get(phase.id))
      .sort((a, b) => a.id - b.id);
  }
}