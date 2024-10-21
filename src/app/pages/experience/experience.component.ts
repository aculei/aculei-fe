import { Component } from "@angular/core";
import { MotionDetectionComponent } from "../../components/motion-detection/motion-detection.component";

@Component({
  selector: "app-experience",
  standalone: true,
  imports: [MotionDetectionComponent],
  templateUrl: "./experience.component.html",
  styleUrl: "./experience.component.css",
})
export class ExperienceComponent {}