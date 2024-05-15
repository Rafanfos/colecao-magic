import { Pipe, PipeTransform } from '@angular/core';
import { ManaIcon } from '../../enums/mana-icon.enum'; // ajuste o caminho conforme necessário

@Pipe({
  name: 'manaSymbolToIconInText',
})
export class ManaSymbolToIconInTextPipe implements PipeTransform {
  transform(text: string): string {
    const symbols = text.match(/{[A-Z]}/g) || [];
    let newText = text;
    symbols.forEach((symbol) => {
      const icon = ManaIcon[symbol as keyof typeof ManaIcon];
      if (icon) {
        // Crie uma expressão regular para corresponder apenas ao símbolo de mana
        const regex = new RegExp(`${symbol}(?![^<]*>)`, 'g');
        newText = newText.replace(
          regex,
          `<img class="img-icon" src="${icon}" alt="${symbol}" />`
        );
      }
    });
    return newText;
  }
}
