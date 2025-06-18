// src/app/two-digit-pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDigit',
  standalone: true
})
export class TwoDigitPipe implements PipeTransform { // Class adı TwoDigitPipe
  transform(value: number | string): string {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return '';
    }
    const num = Number(value);
    return num < 10 && num >= 0 && num % 1 === 0 ? `0${num}` : String(num);
  }
}