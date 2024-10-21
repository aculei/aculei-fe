import {
  Component,
  AfterViewInit,
  Renderer2,
  isStandalone,
} from "@angular/core";

@Component({
  selector: "app-motion-detection",
  templateUrl: "./motion-detection.component.html",
  styleUrls: ["./motion-detection.component.css"],
  standalone: true,
})
export class MotionDetectionComponent implements AfterViewInit {
  imageSpawned: boolean = false; // Variabile per tracciare se c'è un'immagine attualmente visibile

  constructor(private renderer: Renderer2) {}

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

    // Variabili per i quadranti
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

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

        let movementDetected = false;
        let movementQuadrant = "";

        for (let i = 0; i < currentFrame.data.length; i += 4) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor(i / 4 / canvas.width);

          // Confronta il frame corrente con il frame precedente
          if (
            Math.abs(currentFrame.data[i] - frames[activeFrame].data[i]) > 50
          ) {
            // threshold
            movementDetected = true;

            // Determina il quadrante
            if (x < canvas.width / 2 && y < canvas.height / 2) {
              movementQuadrant = "topLeft";
            } else if (x >= canvas.width / 2 && y < canvas.height / 2) {
              movementQuadrant = "topRight";
            } else if (x < canvas.width / 2 && y >= canvas.height / 2) {
              movementQuadrant = "bottomLeft";
            } else {
              movementQuadrant = "bottomRight";
            }
            break; // interrompe il ciclo se viene rilevato un movimento
          }
        }

        if (movementDetected && !this.imageSpawned) {
          this.spawnImage(movementQuadrant);
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

  spawnImage(quadrant: string) {
    this.imageSpawned = true; // Segnala che un'immagine è stata generata

    const img = this.renderer.createElement("img");
    img.src = "assets/volpe.jpg"; // Percorso all'immagine che vuoi mostrare
    img.style.position = "absolute";
    img.style.width = "150px"; // Dimensioni fisse per l'immagine
    img.style.height = "150px";

    // Posiziona l'immagine nel quadrante giusto
    switch (quadrant) {
      case "topLeft":
        img.style.left = "10px";
        img.style.top = "10px";
        break;
      case "topRight":
        img.style.right = "10px";
        img.style.top = "10px";
        break;
      case "bottomLeft":
        img.style.left = "10px";
        img.style.bottom = "10px";
        break;
      case "bottomRight":
        img.style.right = "10px";
        img.style.bottom = "10px";
        break;
    }

    // Aggiunge l'immagine al body
    this.renderer.appendChild(document.body, img);

    // Rimuovi l'immagine dopo qualche secondo e aggiorna lo stato
    setTimeout(() => {
      this.renderer.removeChild(document.body, img);
      this.imageSpawned = false; // Permette di mostrare una nuova immagine
    }, 4000); // L'immagine scompare dopo 2 secondi
  }
}
