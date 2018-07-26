import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';

@Component({
  selector   : 'hello',
  templateUrl: './hello.component.html',
  styleUrls  : ['./hello.component.scss']
})
export class HelloComponent {
  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */
  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english);

  }
}
