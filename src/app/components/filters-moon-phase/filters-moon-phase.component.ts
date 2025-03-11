import { CommonModule } from "@angular/common";
import { Component, model } from "@angular/core";

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

  selectedMoonPhasesFilters = model<SelectedMoonPhaseFilters | undefined>({
    moonPhases: [],
  });

  moonPhases: MoonPhase[] = [
    { id: 1, name: "New Moon", imageSvg: "assets/svg/1.svg" },
    { id: 2, name: "Waxing Crescent", imageSvg: "assets/svg/2.svg" },
    { id: 3, name: "First Quarter", imageSvg: "assets/svg/3.svg" },
    { id: 4, name: "Waxing Gibbous", imageSvg: "assets/svg/4.svg" },
    { id: 5, name: "Full Moon", imageSvg: "assets/svg/5.svg" },
    { id: 6, name: "Waning Gibbous", imageSvg: "assets/svg/6.svg" },
    { id: 7, name: "Last Quarter", imageSvg: "assets/svg/7.svg" },
    { id: 8, name: "Waning Crescent", imageSvg: "assets/svg/8.svg" },
  ];

  selectedMoonPhases = new Map<number, boolean>();

  toggleFilterSelection() {
    this.isFilterSelectionOpen = !this.isFilterSelectionOpen;
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
