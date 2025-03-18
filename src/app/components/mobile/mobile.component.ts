import { NgStyle } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-mobile",
  templateUrl: "./mobile.component.html",
  styleUrls: ["./mobile.component.css"],
  imports: [NgStyle],
})
export class MobileComponent {
  imageUrl: string;
  constructor() {
    this.imageUrl = `/assets/mobile-background-${
      Math.floor(Math.random() * 3) + 1
    }.webp`;
  }
}
