import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  NavigationEnd,
} from "@angular/router";

@Component({
  selector: "app-navbar",
  imports: [RouterModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  currentRoute: string = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        console.log(this.currentRoute);
      }
    });
  }
}
