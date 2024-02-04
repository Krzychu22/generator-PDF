import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from "@angular/forms";
import {AbstractValueAccessor} from "../FormControl";
import {filter, takeUntil, tap} from "rxjs";

@Component({
  selector: 'form-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormInputComponent),
    }
  ]
})
export class FormInputComponent
  extends AbstractValueAccessor
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('inputNode', {static: true})
  inputNode: ElementRef<HTMLInputElement> | undefined;
  control: FormControl = new FormControl('', [Validators.required]);

  @Input() set htmlStr(value: string) {
    this.control.patchValue(value, {emitEvent: false});
    this.autoGrow();
  }

  minWith = false;

  @Input() set _minWith(value: boolean) {
    this.minWith = value;
  }

  @Input() placeholder = '';
  @Input() blockEnter = false;

  @Input() set textAlign(value: 'left' | 'center' | 'right') {
    if (this.inputNode) {
      this.inputNode.nativeElement.style.textAlign = value || 'left';
    }
  }

  fontSize: number | null = null;

  @Input() set _fontSize(value: number) {
    this.fontSize = value;
  }

  @Input() typeInput: 'text' | 'price' | 'quantity' = 'text';
  @Output() newText = new EventEmitter<string>();

  valueChangesSubscription: any;
  valueSubjectSubscription: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.valueSubjectSubscription = this.valueSubject.pipe(
      takeUntil(this.control.valueChanges),
      filter(section => section),
      tap((section) => {
        this.control.patchValue(section, {emitEvent: false});

      })
    ).subscribe();
    this.valueChangesSubscription =
      this.control.valueChanges.subscribe((value: string) => {
        if (this.typeInput === 'price' && value.indexOf(',') !== -1) {
          return this.control.patchValue(value.replace(',', '.'), {emitEvent: false});
        } else if (this.typeInput === 'price' && value.indexOf('.') !== -1 && value.split('.')[1].length > 2) {
          value = value.split('.')[0] + '.' + value.split('.')[1].slice(0, 2);
          return this.control.patchValue(value, {emitEvent: false});
        }
        this.writeValue(value);
        this.newText.emit(value);
        this.autoGrow();

      });
  }

  ngAfterViewInit() {
    this.autoGrow();
  }

  ngOnDestroy() {
    this.valueChangesSubscription.unsubscribe();
    this.valueSubjectSubscription.unsubscribe();
  }

  autoGrow() {
    if (this.inputNode) {
      if (this.fontSize) {
        this.inputNode.nativeElement.style.fontSize = `${this.fontSize}px`;
      }
      this.inputNode.nativeElement.style.height = "1px";
      this.inputNode.nativeElement.style.height = this.inputNode.nativeElement.scrollHeight + "px";
      if (this.minWith) {
        this.inputNode.nativeElement.style.overflowWrap = "normal";
        this.inputNode.nativeElement.style.whiteSpace = "nowrap";
        this.inputNode.nativeElement.style.width = "1px";
        this.inputNode.nativeElement.style.width = this.inputNode.nativeElement.scrollWidth + "px";
      }
    }
  }

  filter(key: KeyboardEvent) {
    switch (this.typeInput) {
      case 'price':
        if (['ArrowLeft', 'ArrowRight', "Backspace", "Delete", ",", "."].indexOf(key.key) === -1
          && (!/^\d+$/.test(key.key) || this.control.value.length >= 10)) {
          return key.preventDefault();
        }
        if (JSON.stringify(this.control.value).indexOf('.') !== -1 && (key.key === '.' || key.key === ',')) {
          return key.preventDefault();
        }
        break;
      case 'quantity':
        if (['ArrowLeft', 'ArrowRight', "Backspace", "Delete"].indexOf(key.key) === -1
          && (!/^\d+$/.test(key.key) || this.control.value.length >= 7)) {
          return key.preventDefault();
        }
        break;
      case 'text':
        if (this.blockEnter && ['Enter'].indexOf(key.key) !== -1) {
          return key.preventDefault();
        }
        break;
    }
  }
}
