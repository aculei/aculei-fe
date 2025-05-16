import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-about",
  imports: [],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.css",
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    window.scrollTo(0, 0);

    document.body.classList.add("about-page-active");
  }

  ngOnDestroy() {
    document.body.classList.remove("about-page-active");
  }
}
