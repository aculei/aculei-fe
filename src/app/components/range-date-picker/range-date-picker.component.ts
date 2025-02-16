import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-range-date-picker",
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./range-date-picker.component.html",
  styleUrl: "./range-date-picker.component.css",
})
export class RangeDatePickerComponent {}
