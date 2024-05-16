import { ManaSymbolToIconInTextPipe } from './mana-symbol-to-icon-in-text.pipe';

describe('ManaSymbolToIconInTextPipe', () => {
  it('Criou uma instância para converter símbolos de mana, em textos, em ícones', () => {
    const pipe = new ManaSymbolToIconInTextPipe();
    expect(pipe).toBeTruthy();
  });
});
