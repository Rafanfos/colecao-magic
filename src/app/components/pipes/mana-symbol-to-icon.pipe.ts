import { Pipe, PipeTransform } from '@angular/core';
import { ManaIcon } from '../enums/mana-icon.enum';

@Pipe({
  name: 'manaSymbolToIcon',
})
export class ManaSymbolToIconPipe implements PipeTransform {
  transform(symbol: string): string {
    if (symbol in ManaIcon) {
      console.log(ManaIcon[symbol as keyof typeof ManaIcon]);
      return ManaIcon[symbol as keyof typeof ManaIcon];
    }
    return '';
  }
}
