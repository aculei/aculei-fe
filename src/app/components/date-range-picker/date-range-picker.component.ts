import {
  Component,
  computed,
  effect,
  HostListener,
  input,
  model,
  output,
  signal,
  untracked,
  viewChild,
  OnInit,
} from "@angular/core";
import { DateTime } from "luxon";
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
  MatDateRangePicker,
} from "@angular/material/datepicker";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-date-range-picker",
  imports: [CommonModule, FormsModule, MatDatepickerModule],
  templateUrl: "./date-range-picker.component.html",
  styleUrl: "./date-range-picker.component.css",
})
export class DateRangePickerComponent {
  id = input.required<string>();
  isFilterSelectionOpen = model<boolean>(false);
  pickerOpened = model<boolean>(false);
  showLabel = input<boolean>(true);
  label = input<string>("Data");
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  nullable = input<boolean>(false);

  dateChange = output<boolean>();

  start = model<Date | undefined>();
  end = model<Date | undefined>();

  innerStart: Date | undefined = undefined;
  innerEnd: Date | undefined = undefined;

  startFocused = signal<boolean>(false);
  endFocused = signal<boolean>(false);

  focused = computed(() => {
    return this.startFocused() || this.endFocused();
  });

  delayed = computed(() => {
    return this.pickerOpened() || this.focused();
  });

  lastValidStartDate: Date | undefined = undefined;
  lastValidEndDate: Date | undefined = undefined;

  picker = viewChild<MatDateRangePicker<any>>("picker");

  constructor() {
    effect(() => {
      const delayed = this.delayed();
      untracked(() => {
        if (!delayed) {
          this.applyDates();
        }
      });
    });
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.onStartBlur();
      this.onEndBlur();
    }
  }

  ngOnInit() {
    this.lastValidStartDate = this.start();
    this.lastValidEndDate = this.end();
  }

  ngAfterViewInit() {
    this.picker()?.openedStream.subscribe(() => {
      this.pickerOpened.set(true);
    });

    this.picker()?.closedStream.subscribe(() => {
      this.pickerOpened.set(true);

      this.applyDates();
    });
  }

  onStartFocus() {
    this.startFocused.set(true);
  }

  onStartBlur() {
    this.startFocused.set(false);
  }

  onEndFocus() {
    this.endFocused.set(true);
  }

  onEndBlur() {
    this.endFocused.set(false);
  }

  /*
   * Imposta la innerStartDate se valida.
   */
  onStartDateChange(event: MatDatepickerInputEvent<DateTime>) {
    const date = event.value?.toJSDate();
    console.log(date);
    if (
      event.value !== null &&
      event.value !== undefined &&
      event.value.isValid &&
      date
    ) {
      this.innerStart = date;
    } else {
      this.innerStart = this.lastValidStartDate ?? undefined;
    }

    if (!this.delayed()) {
      this.applyDates();
    }
    this.dateChange.emit(true);
  }

  onEndDateChange(event: MatDatepickerInputEvent<DateTime>) {
    const date = event.value?.toJSDate();
    console.log(date);
    if (
      event.value !== null &&
      event.value !== undefined &&
      event.value.isValid &&
      date
    ) {
      this.innerEnd = date;
    } else {
      this.innerEnd = this.lastValidEndDate ?? undefined;
    }

    if (!this.delayed()) {
      this.applyDates();
    }
    this.dateChange.emit(true);
  }

  /*
   * Si occupa di applicare entrambe le date, di inizio e fine, se entrambe sono state impostate
   * e entrambe sono valide. Altrimenti, viene impostato l'ultimo range di date valido.
   */
  applyDates() {
    if (this.innerStart && this.innerEnd) {
      this.start.set(this.innerStart);
      this.end.set(this.innerEnd);

      this.lastValidStartDate = new Date(this.innerStart);
      this.lastValidEndDate = new Date(this.innerEnd);
    } else {
      this.innerStart = this.lastValidStartDate || undefined;
      this.innerEnd = this.lastValidEndDate || undefined;
      this.start.set(this.innerStart);
      this.end.set(this.innerEnd);
    }
  }

  clear() {
    this.innerStart = undefined;
    this.innerEnd = undefined;
    this.lastValidStartDate = undefined;
    this.lastValidEndDate = undefined;
    this.start.set(undefined);
    this.end.set(undefined);
  }
}
