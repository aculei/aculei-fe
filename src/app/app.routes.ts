import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ArchiveComponent } from "./pages/archive/archive.component";
import { AboutComponent } from "./pages/about/about.component";
import { ExperienceComponent } from "./pages/experience/experience.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "archive", component: ArchiveComponent },
  { path: "experience", component: ExperienceComponent },
  { path: "about", component: AboutComponent },
];
