import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgIf } from "@angular/common";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MobileComponent } from "./components/mobile/mobile.component";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    NgIf,
    NavbarComponent,
    FooterComponent,
    MobileComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit, OnDestroy {
  isMobile = false;

  ngOnInit(): void {
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile);
  }

  ngOnDestroy(): void {
    window.removeEventListener("resize", this.checkIfMobile);
  }

  checkIfMobile = (): void => {
    const isMobileAgent = /Mobi|iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );
    const isMobileWidth = window.innerWidth < 768;

    this.isMobile = isMobileAgent || isMobileWidth;
  };
}
