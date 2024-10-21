import { AfterViewInit, Component } from "@angular/core";

@Component({
  selector: "app-motion-detection",
  standalone: true,
  imports: [],
  templateUrl: "./motion-detection.component.html",
  styleUrl: "./motion-detection.component.css",
})
export class MotionDetectionComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initMotionDetection();
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

    const draw = () => {
      if (localStream && context && finalContext) {
        // Usa le dimensioni del viewport per i canvas
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

        for (let i = 0; i < currentFrame.data.length; i += 4) {
          currentFrame.data[i] =
            0.5 * (255 - currentFrame.data[i]) +
            0.5 * frames[activeFrame].data[i];
          currentFrame.data[i + 1] =
            0.5 * (255 - currentFrame.data[i + 1]) +
            0.5 * frames[activeFrame].data[i + 1];
          currentFrame.data[i + 2] =
            0.5 * (255 - currentFrame.data[i + 2]) +
            0.5 * frames[activeFrame].data[i + 2];
          currentFrame.data[i + 3] = 255;
        }
        finalContext.putImageData(currentFrame, 0, 0);
      }
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          localStream = stream;
          camStream.srcObject = stream;
          camStream.play();
          setInterval(draw, 32);
        })
        .catch((error) => console.error("Error accessing webcam:", error));
    } else {
      console.error("Your browser does not support getUserMedia");
    }
  }
}
