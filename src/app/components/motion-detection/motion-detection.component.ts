import { HttpClient } from "@angular/common/http";
import { Component, AfterViewInit, Renderer2, OnDestroy } from "@angular/core";
import { Image } from "../../pages/archive/archive.component";
import { environment } from "../../../environments/environment.development";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-motion-detection",
  templateUrl: "./motion-detection.component.html",
  styleUrls: ["./motion-detection.component.css"],
  standalone: true,
  imports: [NgIf],
})
export class MotionDetectionComponent implements AfterViewInit, OnDestroy {
  imageSpawned: boolean = false;
  drawInterval: any;
  image: Image | undefined;
  private localStream: MediaStream | null = null;
  userMediaAvailable: boolean = true;

  private apiUrl = environment.apiUrl;
  private bucketUrl = environment.imageBaseUrl;

  constructor(private renderer: Renderer2, private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMotionDetection();
  }

  ngOnDestroy(): void {
    if (this.drawInterval) {
      clearInterval(this.drawInterval);
    }

    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      this.renderer.removeChild(document.body, img);
    });

    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  initMotionDetection() {
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const canvasFinal: HTMLCanvasElement = document.getElementById(
      "canvasFinal"
    ) as HTMLCanvasElement;
    const camStream: HTMLVideoElement = document.getElementById(
      "camStream"
    ) as HTMLVideoElement;

    const context = canvas.getContext("2d");
    const finalContext = canvasFinal.getContext("2d");
    let localStream: MediaStream | null = null;
    let frames: ImageData[] = [];
    let activeFrame = 0;

    const rows = 10;
    const cols = 10;
    const gridWidth = window.innerWidth / cols;
    const gridHeight = window.innerHeight / rows;

    const movementGrid: number[][] = Array.from({ length: rows }, () =>
      Array(cols).fill(0)
    );

    const draw = () => {
      if (localStream && context && finalContext) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvasFinal.width = window.innerWidth;
        canvasFinal.height = window.innerHeight;

        context.drawImage(camStream, 0, 0, canvas.width, canvas.height);
        frames[activeFrame] = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        activeFrame = activeFrame === 0 ? 1 : 0;
        const currentFrame = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const previousFrame = frames[activeFrame];

        if (!previousFrame) {
          return;
        }

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            movementGrid[i][j] = 0;
          }
        }

        for (let i = 0; i < currentFrame.data.length; i += 4) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor(i / 4 / canvas.width);

          const diffR = Math.abs(currentFrame.data[i] - previousFrame.data[i]);
          const diffG = Math.abs(
            currentFrame.data[i + 1] - previousFrame.data[i + 1]
          );
          const diffB = Math.abs(
            currentFrame.data[i + 2] - previousFrame.data[i + 2]
          );

          if (diffR > 50 || diffG > 50 || diffB > 50) {
            const row = Math.floor(y / gridHeight);
            const col = Math.floor(x / gridWidth);
            if (row < rows && col < cols) {
              movementGrid[row][col]++;
            }

            // const grayValue = 128;
            currentFrame.data[i] = 46;
            currentFrame.data[i + 1] = 139;
            currentFrame.data[i + 2] = 91;
            currentFrame.data[i + 3] = 255;
          } else {
            currentFrame.data[i] =
              0.5 * (100 - currentFrame.data[i]) + 0.5 * previousFrame.data[i];
            currentFrame.data[i + 1] =
              0.5 * (100 - currentFrame.data[i + 1]) +
              0.5 * previousFrame.data[i + 1];
            currentFrame.data[i + 2] =
              0.5 * (100 - currentFrame.data[i + 2]) +
              0.5 * previousFrame.data[i + 2];
            currentFrame.data[i + 3] = 255;
          }
        }

        let maxMovement = 0;
        let maxRow = 0;
        let maxCol = 0;

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            if (movementGrid[i][j] > maxMovement) {
              maxMovement = movementGrid[i][j];
              maxRow = i;
              maxCol = j;
            }
          }
        }

        if (maxMovement > 400 && !this.imageSpawned) {
          this.spawnImage(maxRow, maxCol, gridWidth, gridHeight);
        }

        finalContext.putImageData(currentFrame, 0, 0);
      }
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          localStream = stream;
          this.localStream = stream;
          camStream.srcObject = stream;
          camStream.play();
          this.drawInterval = setInterval(draw, 32);
          this.drawInterval;
        })
        .catch((error) => {
          this.userMediaAvailable = false;
          console.error("Error accessing webcam:", error);
        });
    } else {
      this.userMediaAvailable = false;
      console.error("Your browser does not support getUserMedia");
    }
  }

  fetchImage() {
    this.http.get<Image>(`${this.apiUrl}experience/random`).subscribe({
      next: (response) => {
        this.image = {
          id: response.id || "",
          cam: response.cam || "",
          date: response.date || "",
          moon_phase: response.moon_phase || "",
          temperature: response.temperature || 0,
          predicted_animal: response.predicted_animal || "",
          image_name: response.image_name || "",
        };
      },
      error: (error) => {
        console.error("Error fetching image:", error);
      },
    });
  }

  spawnImage(row: number, col: number, gridWidth: number, gridHeight: number) {
    this.fetchImage();

    if (!this.image) {
      return;
    }

    this.imageSpawned = true;

    const img = this.renderer.createElement("img");
    img.src = this.bucketUrl + this.image?.image_name;
    img.style.position = "absolute";
    img.style.visibility = "hidden";
    img.style.transition = "all 0.3s ease-in-out";

    this.renderer.appendChild(document.body, img);

    let timeoutId: any;

    img.onload = () => {
      let imgWidth = img.naturalWidth / 6;
      let imgHeight = img.naturalHeight / 6;

      let left = col * gridWidth + (gridWidth / 2 - imgWidth / 2);
      let top = row * gridHeight + (gridHeight / 2 - imgHeight / 2);

      const maxLeft = window.innerWidth - imgWidth;
      const maxTop = window.innerHeight - imgHeight - 80;

      left = Math.max(10, Math.min(left, maxLeft));
      top = Math.max(10, Math.min(top, maxTop));

      img.style.width = `${imgWidth}px`;
      img.style.height = `${imgHeight}px`;
      img.style.left = `${left}px`;
      img.style.top = `${top}px`;
      img.style.visibility = "visible";
      img.style.cursor = "pointer";

      img.addEventListener("mousedown", () => {
        clearTimeout(timeoutId);
        img.style.width = "80%";
        img.style.height = "80%";
        img.style.left = "10%";
        img.style.top = "10%";
      });

      img.addEventListener("mouseup", () => {
        img.style.width = `${imgWidth}px`;
        img.style.height = `${imgHeight}px`;
        img.style.left = `${left}px`;
        img.style.top = `${top}px`;

        timeoutId = setTimeout(() => {
          this.renderer.removeChild(document.body, img);
          this.imageSpawned = false;
        }, 2000);
      });

      timeoutId = setTimeout(() => {
        this.renderer.removeChild(document.body, img);
        this.imageSpawned = false;
      }, 2000);
    };
  }
}
