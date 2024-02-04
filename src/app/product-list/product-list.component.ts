import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractValueAccessor} from "../FormControl";
import {Category} from "./type/type";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {tap} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {FormInputComponent} from "../form-input/form-input.component";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {SingleProductPricePipe} from "./pipe/single-product-price.pipe";
import {SumOfProductValuesPipe} from "./pipe/sum-of-product-values.pipe";
import {MatIcon} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    FormInputComponent,
    MatMiniFabButton,
    MatButton,
    HttpClientModule,
    SingleProductPricePipe,
    SumOfProductValuesPipe,
    MatIcon,
    NgIf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent
  extends AbstractValueAccessor
  implements OnInit, OnDestroy {
  categories: Category[] = ['Odzież', 'Sprzęt', 'Akcesoria', 'Elektronika'];

  form = new FormGroup({
    sections: new FormArray([
      new FormGroup({
        title: new FormControl('Piłka nożna'),
        section: new FormArray([
          new FormGroup({
            name: new FormControl('Piłka, rozmiar 5'),
            category: new FormControl('Sprzęt'),
            price: new FormControl(99.99),
            quantity: new FormControl(4),
          }),
          new FormGroup({
            name: new FormControl('Koszulka, rozmiar L'),
            category: new FormControl('Odzież'),
            price: new FormControl(55.49),
            quantity: new FormControl(10),
          }),
        ]),
      }),
    ])
  });

  get sections() {
    return this.form.controls.sections;
  }

  valueChangesSubscription: any;

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    this.valueChangesSubscription = this.form.valueChanges.pipe(
      tap((value) => {
        this.onChange(value);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.valueChangesSubscription.unsubscribe();
  }

  addNewItem(index: number) {
    const newProduct = this.fb.group({
      name: [''],
      category: [null],
      price: [1],
      quantity: [1],
    });
    (this.sections.at(index).get('section') as FormArray).push(newProduct);
  }

  addNewSection() {
    const newSection = this.fb.group({
      title: [''],
      section: this.fb.array([])
    });
    (this.form.get('sections') as FormArray).push(newSection);
  }

  removeProduct(indexSection: number, indexProduct: number) {
    (this.sections.at(indexSection).get('section') as FormArray).removeAt(indexProduct);
  }
  removeSection(indexSection: number) {
    (this.form.get('sections') as FormArray).removeAt(indexSection);
  }
  trackItem(i: number) {
    return i;
  }
}
