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

    // Definisci la griglia
    const rows = 10; // Numero di righe della griglia
    const cols = 10; // Numero di colonne della griglia
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

        // Resetta la griglia
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            movementGrid[i][j] = 0;
          }
        }

        for (let i = 0; i < currentFrame.data.length; i += 4) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor(i / 4 / canvas.width);

          // Confronta il frame corrente con il frame precedente
          if (
            Math.abs(currentFrame.data[i] - frames[activeFrame].data[i]) > 50
          ) {
            // threshold per rilevare movimento
            const row = Math.floor(y / gridHeight);
            const col = Math.floor(x / gridWidth);
            if (row < rows && col < cols) {
              movementGrid[row][col]++;
            }
          }
        }

        // Trova la cella con il maggior movimento
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

        if (maxMovement > 0 && !this.imageSpawned) {
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
          camStream.srcObject = stream;
          camStream.play();
          setInterval(draw, 32);
        })
        .catch((error) => console.error("Error accessing webcam:", error));
    } else {
      console.error("Your browser does not support getUserMedia");
    }
  }

  spawnImage(row: number, col: number, gridWidth: number, gridHeight: number) {
    this.imageSpawned = true; // Segnala che un'immagine è stata generata

    const img = this.renderer.createElement("img");
    img.src = "assets/volpe.jpg"; // Percorso all'immagine che vuoi mostrare
    img.style.position = "absolute";
    img.style.width = "450px"; // Dimensioni fisse per l'immagine

    // Calcola la posizione in base alla cella della griglia con più movimento
    img.style.left = `${col * gridWidth + (gridWidth / 2 - 75)}px`; // Centra l'immagine nella cella
    img.style.top = `${row * gridHeight + (gridHeight / 2 - 75)}px`; // Centra l'immagine nella cella

    // Aggiunge l'immagine al body
    this.renderer.appendChild(document.body, img);

    // Rimuovi l'immagine dopo qualche secondo e aggiorna lo stato
    setTimeout(() => {
      this.renderer.removeChild(document.body, img);
      this.imageSpawned = false; // Permette di mostrare una nuova immagine
    }, 2000); // L'immagine scompare dopo 2 secondi
  }
}
