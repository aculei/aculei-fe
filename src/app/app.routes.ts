import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ArchiveComponent } from "./pages/archive/archive.component";
import { ArchiveDetailComponent } from "./pages/archive-detail/archive-detail.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "archive", component: ArchiveComponent },
  {
    path: "archive/:id",
    component: ArchiveDetailComponent,
  },
];
