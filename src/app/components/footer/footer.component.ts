import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

export interface DatasetInfo {
  [key: string]: string | number;
}
@Component({
  selector: "app-footer",
  imports: [CommonModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css",
})
export class FooterComponent {
  datasetInfo: DatasetInfo = {
    badger: 347,
    buzzard: 63,
    cat: 10,
    "camera 1": "43°10'19.2\"N 12°23'53.2\"E (DESTROYED BY EXCAVATOR)",
    "camera 2":
      "43°10'26.3\"N 12°23'53.4\"E (OVERWHELMED BY THE DRAINAGE CANAL)",
    "camera 3": "43°10'19.0\"N 12°23'49.6\"E",
    "camera 4": "43°10'29.6\"N 12°23'54.5\"E",
    "camera 5": "(STOLEN)",
    "camera 6": "43°10'26.2\"N 12°23'52.9\"E",
    "camera 7": "43°10'29.4\"N 12°23'44.2\"E",
    deer: 928,
    fox: 2633,
    hare: 283,
    heron: 184,
    horse: 507,
    mallard: 390,
    marten: 426,
    "photos by hunter camera 1.0": "9076",
    "photos by hunter camera 2.0": "188",
    "photos by hunter camera 3.0": "995",
    "photos by hunter camera 4.0": "2764",
    "photos by hunter camera 5.0": "1139",
    "photos by hunter camera 6.0": "1559",
    "photos by hunter camera 7.0": "498",
    "photos during autumn": "1880",
    "photos during moon first_quarter": "2620",
    "photos during moon full_moon": "2704",
    "photos during moon last_quarter": "1873",
    "photos during moon new_moon": "1774",
    "photos during moon waning_crescent": "2052",
    "photos during moon waning_gibbous": "2045",
    "photos during moon waxing_crescent": "1669",
    "photos during moon waxing_gibbous": "2125",
    "photos during spring": "2776",
    "photos during summer": "9211",
    "photos during winter": "2995",
    porcupine: 1544,
    squirrel: 34,
    "total records in the dataset": 16874,
    "wild boar": 9502,
    wolf: 23,
  };
  datasetEntries = Object.entries(this.datasetInfo);
}
