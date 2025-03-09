import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, model, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { ArchiveCarouselComponent } from "../../components/archive-carousel/archive-carousel.component";
import { FiltersDatepickerComponent } from "../../components/filters-datepicker/filters-datepicker.component";
import { FiltersDropdownComponent } from "../../components/filters-dropdown/filters-dropdown.component";
import { FiltersMoonPhaseComponent } from "../../components/filters-moon-phase/filters-moon-phase.component";
import { FiltersTemperatureComponent } from "../../components/filters-temperature/filters-temperature.component";

export interface Image {
  id: string;
  cam: string;
  date: string;
  image_name: string;
  moon_phase: string;
  predicted_animal: string;
  temperature: number;
}

@Component({
  selector: "app-archive",
  imports: [
    ArchiveCarouselComponent,
    FiltersDropdownComponent,
    FiltersDatepickerComponent,
    FiltersTemperatureComponent,
    FiltersMoonPhaseComponent,
  ],
  templateUrl: "./archive.component.html",
  styleUrl: "./archive.component.css",
})
export class ArchiveComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchArchive();
  }

  start = model<Date | undefined>();
  end = model<Date | undefined>();

  items = Array(10)
    .fill(0)
    .map((_, i) => i);

  isAnimalFilterOpen = false;

  fetchArchive() {
    const params = new HttpParams().set("page", "0").set("size", "99999");

    this.http
      .get<any>(`${this.apiUrl}archive`, { params, responseType: "json" })
      .subscribe({
        next: (response) => {
          const imagesArray = response.data || [];
          if (Array.isArray(imagesArray)) {
            this.groupImagesByCam(imagesArray);
          } else {
            console.error("Error:", response);
          }
        },
        error: (error) => {
          console.error("Errore durante la richiesta API:", error);
        },
      });
  }

  groupedImages: Record<string, Image[]> = {};

  getCams(): string[] {
    return Object.keys(this.groupedImages);
  }

  groupImagesByCam(images: Image[]) {
    this.groupedImages = images.reduce((acc, image) => {
      if (!acc[image.cam]) {
        acc[image.cam] = [];
      }
      acc[image.cam].push(image);
      return acc;
    }, {} as Record<string, Image[]>);

    return this.groupedImages;
  }
}
