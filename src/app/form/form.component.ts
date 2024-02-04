import { Component } from '@angular/core';
import {AngularEditorConfig, AngularEditorModule} from "@kolkov/angular-editor";
import {FormInputComponent} from "../form-input/form-input.component";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {ProductListComponent} from "../product-list/product-list.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormInputComponent,
    NgForOf,
    MatIcon,
    MatMiniFabButton,
    MatButton,
    AngularEditorModule,
    FormsModule,
    ProductListComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  readyAddresses = [
    {
      name: 'Jan Kowalski',
      street: 'ul. Bagienna 32',
      zipCode: '00-001 Bździszewo',
    },
    {
      name: 'Eugeniusz Iksiński',
      street: 'ul. Wesoła 12a/6',
      zipCode: '12-345 Smutkowo',
    },
    {
      name: 'Kuba Zawadzki',
      street: 'ul. Kolorowa 12',
      zipCode: '12-432 Kolorowo',
    },
    {
      name: 'Zbigniew Nowak',
      street: 'ul. Czarna 4',
      zipCode: '12-432 Czarnowo',
    },
    {
      name: 'Marek Kowal',
      street: 'ul. Biała 8',
      zipCode: '12-432 Białowo',
    }
  ];

  editor: AngularEditorConfig = {
    rawPaste: false,
    spellcheck: true,
    height: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    width: '100%',
    minWidth: '0',
    translate: 'false',
    enableToolbar: true,
    showToolbar: false,
    editable: true,
    placeholder: 'Treść wiadomości',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'heading',
        'fontName'
      ],
      [
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };
  html = '<p>Przesyłam zestawienie produktów, które można nabyć z naszej hurtowni. W przypadku zainteresowania którymś z produktów, proszę o kontakt telefonicznie na numer <strong>123-456-789</strong> lub mailowo - <strong>zbigniew.tenisziemny@superproduktysportowe.pl</strong></p>';

  blockingLossOfFocus = false;
  addresses = [
    {
      name: 'Jan Kowalski',
      street: 'ul. Bagienna 32',
      zipCode: '00-001 Bździszewo',
    },
    {
      name: 'Eugeniusz Iksiński',
      street: 'ul. Wesoła 12a/6',
      zipCode: '12-345 Smutkowo',
    }
  ];

  getResultantHTML() {
    const html = document.documentElement.innerHTML
      .replace(/<button.*?>.*?<\/button>/g, '')
      .replace(/<form-input.*?>(.*?)<\/form-input>/g, (match, p1) =>
        p1.replace(/textarea/g, 'span').replace(/height.*?;/g, 'overflow-wrap: anywhere;'))
      .replace(/contenteditable=".*?"/g, '')
      .replace(/<td.*?class="button".*?>.*?<\/td>/g, '')
      .replace(/<option.*?>.*?<\/option>/g, '')
      .replace(/select/g, 'span')
      .replace(/class="mat-typography"/g, (match) => match + 'style="margin: 0;');
    console.log('%chtml:', 'color: red; font-size: 20px;');
    console.log(html);
  }

  addNewAddress() {
    const index = Math.floor(Math.random() * this.readyAddresses.length);
    this.addresses.push(this.readyAddresses[index]);
  }

  removeAddress(index: number) {
    this.addresses.splice(index, 1);
  }

  tornOffToolbar() {
    if (this.blockingLossOfFocus) {
      return;
    }
    this.editor.showToolbar = false;
  }

  tornOnToolbar() {
    this.editor.showToolbar = true;
  }

  blockLosingFocus() {
    this.blockingLossOfFocus = true;
  }

  unlockLosingFocus() {
    this.blockingLossOfFocus = false;
  }
}
