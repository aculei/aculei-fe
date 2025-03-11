import { CommonModule, DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment.development";
import { Image } from "../archive/archive.component";

@Component({
  selector: "app-archive-detail",
  imports: [CommonModule],
  templateUrl: "./archive-detail.component.html",
  styleUrl: "./archive-detail.component.css",
  providers: [DatePipe],
})
export class ArchiveDetailComponent {
  archiveImageId: string | undefined = undefined;
  image: Image | undefined = undefined;

  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  datePipe = inject(DatePipe);

  apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.archiveImageId = paramMap.get("id") as string;
    });
    if (this.archiveImageId) {
      this.fetchImage(this.archiveImageId);
    }
  }

  fetchImage(archiveImageId: string) {
    this.http
      .get<any>(`${this.apiUrl}archive/image/${archiveImageId}`, {
        responseType: "json",
      })
      .subscribe({
        next: (response) => {
          this.image = response;
        },
        error: (error) => {
          console.error("Errore durante la richiesta API:", error);
        },
      });
  }
  formatDate(date: string) {
    // Converte la stringa in un oggetto Date
    const formatted = this.datePipe.transform(date, "dd/MM/yy");
    return formatted;
  }
}
