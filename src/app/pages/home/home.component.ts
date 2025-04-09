import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  videoUrl: string;

  constructor() {
    this.videoUrl = `https://videos.aculei.xyz/${
      Math.floor(Math.random() * 15) + 1
    }.mp4`;
  }
}
