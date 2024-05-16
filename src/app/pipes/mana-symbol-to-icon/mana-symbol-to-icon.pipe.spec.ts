import { ManaSymbolToIconPipe } from './mana-symbol-to-icon.pipe';

describe('ManaSymbolToIconPipe', () => {
  it('Criou uma instância para converter símbolos de mana em ícones', () => {
    const pipe = new ManaSymbolToIconPipe();
    expect(pipe).toBeTruthy();
  });
});
