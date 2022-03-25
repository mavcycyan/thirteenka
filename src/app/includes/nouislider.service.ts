import { Injectable } from '@angular/core';
import noUiSlider from 'nouislider/dist/nouislider';

@Injectable({
  providedIn: 'root'
})
export class NouisliderService {

  constructor() { }

  static create(slider: any, range: number[] = [0, 1], start: number[] = [0, 1]) {
      noUiSlider.create(slider, {
          start: start,
          connect: true,
          range: {
              'min': range[0],
              'max': range[1]
          }
      });
      // rangeSlider.noUiSlider.on('update', function (values, handle) {
      //     rangeSliderValueElement.innerHTML = values[handle];
      // });
  }
}
