import { CommonModule } from "@angular/common";
import { Component, input, model } from "@angular/core";
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

  getIconFromName(name: string): string {
    return this.moonPhases.find((phase) => phase.name === name)?.imageSvg || "";
  }

  toggleFilterSelection() {
    if (this.selectedImageFilters() == undefined) {
      this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
    }
  }

  toggleMoonPhase(phase: MoonPhase) {
    const isSelected = this.selectedMoonPhases.get(phase.id) || false;
    this.selectedMoonPhases.set(phase.id, !isSelected);
    this.selectedMoonPhasesFilters.set({
      moonPhases: this.getSelectedMoonPhases().map((phase) => phase.name),
    });
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
