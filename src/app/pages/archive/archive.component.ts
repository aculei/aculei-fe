import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, model, OnDestroy, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { FiltersDatepickerComponent } from "../../components/filters-datepicker/filters-datepicker.component";
import {
  FiltersMoonPhaseComponent,
  SelectedMoonPhaseFilters,
} from "../../components/filters-moon-phase/filters-moon-phase.component";
import { FiltersTemperatureComponent } from "../../components/filters-temperature/filters-temperature.component";
import { FiltersTemperatureFromTo } from "../../components/filters-temperature/filters-temperature.component";
import {
  FiltersDropdownComponent,
  SelectedAnimalsFilters,
} from "../../components/filters-dropdown/filters-dropdown.component";
import { toObservable } from "@angular/core/rxjs-interop";
import {
  debounce,
  distinctUntilChanged,
  interval,
  skip,
  Subscription,
} from "rxjs";
import { ImageDetailVideoComponent } from "../../components/image-detail-video/image-detail-video.component";
import { CommonModule } from "@angular/common";
import { ArchiveImageCarouselComponent } from "../../components/archive-image-carousel/archive-image-carousel.component";
import { ArchiveCarouselRowComponent } from "../../components/archive-carousel-row/archive-carousel-row.component";
export interface Image {
  id: string;
  cam: string;
  date: string;
  image_name: string;
  moon_phase: string;
  predicted_animal: string;
  temperature: number;
  top_predictions: string;
}
export interface ArchiveSelectedFilters {
  animal?: string | string[];
  temperature?: (number | undefined)[];
  moon_phase?: string | string[];
  date?: string | string[] | undefined;
}

export interface ArchiveFilters {
  animal?: AnimalsFilters;
  temperature?: TemperatureFilters;
  moon_phase?: MoonPhaseFilters;
}
export interface AnimalsFilters {
  name: string;
  values: string[];
}

export interface TemperatureFilters {
  name: string;
  from: number;
  to: number;
}

export interface MoonPhaseFilters {
  name: string;
  values: string[];
}

@Component({
  selector: "app-archive",
  imports: [
    FiltersDropdownComponent,
    FiltersDatepickerComponent,
    FiltersTemperatureComponent,
    FiltersMoonPhaseComponent,
    ImageDetailVideoComponent,
    CommonModule,
    ArchiveImageCarouselComponent,
    ArchiveCarouselRowComponent,
  ],
  templateUrl: "./archive.component.html",
  styleUrl: "./archive.component.css",
})
export class ArchiveComponent implements OnInit, OnDestroy {
  animalsFilters = model<SelectedAnimalsFilters | undefined>();
  selectedImageFilters = model<Image | undefined>();
  selectedAnimalsFilters = model<SelectedAnimalsFilters | undefined>();
  selectedAnimalsFilters$ = toObservable(this.selectedAnimalsFilters);

  temperatureFromToFilters = model<FiltersTemperatureFromTo | undefined>();
  temperatureFromToFilters$ = toObservable(this.temperatureFromToFilters);

  selectedMoonPhasesFilters = model<SelectedMoonPhaseFilters | undefined>();
  selectedMoonPhasesFilters$ = toObservable(this.selectedMoonPhasesFilters);

  subscriptions: Record<string, Subscription | undefined> = {};

  showCarouselDetail = false;
  currentImages: Image[] | undefined;
  currentIndex: number | undefined;

  animalFiltersDropdpown = model(false);

  filters: ArchiveFilters = {
    animal: {
      name: "animal",
      values: [],
    },
    temperature: {
      name: "temperature",
      from: 0,
      to: 0,
    },
  };

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchFilters();
    this.fetchArchive();
    this.subscriptions["temperatureFromToFilters"] =
      this.temperatureFromToFilters$
        .pipe(
          debounce(() => interval(250)),
          distinctUntilChanged(),
          skip(1)
        )
        .subscribe(() => {
          this.fetchArchive();
        });

    this.selectedAnimalsFilters$
      .pipe(distinctUntilChanged(), skip(1))
      .subscribe(() => {
        this.fetchArchive();
      });

    this.selectedMoonPhasesFilters$
      .pipe(distinctUntilChanged(), skip(1))
      .subscribe(() => {
        this.fetchArchive();
      });
  }

  start = model<Date | undefined>();
  end = model<Date | undefined>();

  items = Array(10)
    .fill(0)
    .map((_, i) => i);

  isAnimalFilterOpen = false;

  fetchFilters() {
    this.http
      .get<any>(`${this.apiUrl}filters`, { responseType: "json" })
      .subscribe({
        next: (response) => {
          this.filters = response.reduce((acc: ArchiveFilters, filter: any) => {
            switch (filter.name) {
              case "animals":
                acc.animal = {
                  name: filter.name,
                  values: filter.values || [],
                };
                break;
              case "temperatures":
                acc.temperature = {
                  name: filter.name,
                  from: filter.from ?? 0,
                  to: filter.to ?? 0,
                };
                this.temperatureFromToFilters.set({
                  from: filter.from,
                  to: filter.to,
                });
                break;
              case "moon_phases":
                acc.moon_phase = {
                  name: filter.name,
                  values: filter.values || [],
                };
                break;
            }
            return acc;
          }, {} as ArchiveFilters);
        },
        error: (error) => {
          console.error("Errore durante la richiesta API:", error);
        },
      });
  }

  fetchArchive() {
    console.log(this.start());
    this.subscriptions["fetchSubscription"]?.unsubscribe();

    if (this.start() && this.end()) {
      const start = this.start()?.toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const end = this.end()?.toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

    const filters: ArchiveSelectedFilters = {
      animal: this.selectedAnimalsFilters()?.animals,
      temperature:
        this.temperatureFromToFilters()?.from &&
        this.temperatureFromToFilters()?.to
          ? [
              this.temperatureFromToFilters()?.from,
              this.temperatureFromToFilters()?.to,
            ]
          : [],
      moon_phase: this.selectedMoonPhasesFilters()?.moonPhases,
      date:
        this.start() && this.end()
          ? [
              this.start()?.toLocaleString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }) ?? "",
              this.end()?.toLocaleString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }) ?? "",
            ]
          : [],
    };

    // let params = new HttpParams().set("page", "0").set("size", "99999");
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof ArchiveSelectedFilters];
      if (value !== undefined && value.length > 0) {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v !== undefined) {
              params = params.append(key, v.toString());
            }
          });
        } else {
          params = params.set(key, value.toString());
        }
      }
    });

    this.subscriptions["fetchSubscriptions"] = this.http
      .get<any>(`${this.apiUrl}archive`, { params, responseType: "json" })
      .subscribe({
        next: (response) => {
          const imagesArray = response.data || [];
          if (Array.isArray(imagesArray)) {
            imagesArray.map((image: Image) => {
              const validJsonString = image.top_predictions.replace(/'/g, '"');
              image.top_predictions = JSON.parse(validJsonString)
                .map(
                  (pred: { score: number; label: string }) =>
                    `${pred.label}: ${(pred.score * 100).toFixed(2)}%`
                )
                .join(" - ");
              return image;
            });

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
    return Object.keys(this.groupedImages).sort();
  }

  updateCurrentImages(next: boolean) {
    let newImages: Image[] = [];

    if (next) {
      newImages = this.getNextgroupedImages();
      if (newImages?.length) {
        this.currentImages = newImages;
        this.currentIndex = 0;
        this.selectedImageFilters.set(this.currentImages[0]);
        this.showCarouselDetail = true;
      }
    } else {
      newImages = this.getPrevgroupedImages();
      if (newImages?.length) {
        this.currentImages = newImages;
        this.currentIndex = newImages.length - 1;
        this.selectedImageFilters.set(this.currentImages[this.currentIndex]);
        this.showCarouselDetail = true;
      }
    }
  }

  getNextgroupedImages(): Image[] {
    const cams = this.getCams();
    const currentCamIndex = cams.findIndex(
      (cam) => cam === this.currentImages?.[0].cam
    );

    if (currentCamIndex !== -1 && currentCamIndex < cams.length - 1) {
      const nextCam = cams[currentCamIndex + 1];
      return this.groupedImages[nextCam];
    }
    return [];
  }

  getPrevgroupedImages(): Image[] {
    const cams = this.getCams();
    const currentCamIndex = cams.findIndex(
      (cam) => cam === this.currentImages?.[0].cam
    );

    if (currentCamIndex > 0) {
      const prevCam = cams[currentCamIndex - 1];
      return this.groupedImages[prevCam];
    }
    return [];
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

  onImageClick(event: { images: Image[]; index: number }) {
    this.showCarouselDetail = true;
    this.currentIndex = event.index;
    this.currentImages = event.images;
    this.selectedImageFilters.set(event.images[event.index]);
    this.animalFiltersDropdpown.set(false);
  }

  ngOnDestroy() {
    Object.keys(this.subscriptions).forEach((key) => {
      this.subscriptions[key]?.unsubscribe();
    });
  }

  closeImageDetail() {
    this.selectedImageFilters.set(undefined);
  }
}
