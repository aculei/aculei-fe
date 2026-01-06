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
    badger: 678,
    buzzard: 287,
    cat: 15,
    "camera 1": "43°10'19.2\"N 12°23'53.2\"E (DESTROYED BY EXCAVATOR)",
    "camera 2":
      "43°10'26.3\"N 12°23'53.4\"E (OVERWHELMED BY THE DRAINAGE CANAL)",
    "camera 3": "43°10'19.0\"N 12°23'49.6\"E",
    "camera 4": "43°10'29.6\"N 12°23'54.5\"E",
    "camera 5": "(STOLEN)",
    "camera 6": "43°10'26.2\"N 12°23'52.9\"E",
    "camera 7": "43°10'29.4\"N 12°23'44.2\"E",
    "camera 8": "43°10'16.7\"N 12°23'51.7\"E",
    "camera 9": "43°10'26.7\"N 12°24'04.9\"E",
    deer: 4754,
    fox: 10857,
    hare: 815,
    heron: 1709,
    horse: 1995,
    mallard: 530,
    marten: 426,
    "photos by hunter camera 1.0": "10636",
    "photos by hunter camera 2.0": "879",
    "photos by hunter camera 3.0": "4249",
    "photos by hunter camera 4.0": "11965",
    "photos by hunter camera 5.0": "2188",
    "photos by hunter camera 6.0": "5788",
    "photos by hunter camera 7.0": "4881",
    "photos by hunter camera 8.0": "148",
    "photos by hunter camera 9.0": "237",
    "photos during autumn": "7315",
    "photos during moon first_quarter": "5428",
    "photos during moon full_moon": "5249",
    "photos during moon last_quarter": "5218",
    "photos during moon new_moon": "4782",
    "photos during moon waning_crescent": "5169",
    "photos during moon waning_gibbous": "5060",
    "photos during moon waxing_crescent": "4629",
    "photos during moon waxing_gibbous": "5287",
    "photos during spring": "9993",
    "photos during summer": "14652",
    "photos during winter": "8862",
    porcupine: 5158,
    squirrel: 168,
    "total records in the dataset": 40970,
    "wild boar": 13540,
    wolf: 54,
  };
  datasetEntries = Object.entries(this.datasetInfo);
}
