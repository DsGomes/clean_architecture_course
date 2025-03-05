import Cpf from "../src/Cpf";

describe('Cpf Validator function', () => {
  it('should cpf is valid where there is no punctuation', () => {
    const cpf = new Cpf('94986150049');
    const result = cpf.validate();
    expect(result).toEqual(true);
  })

  it('should accept string with punctuation and cpf is valid', () => {
    const cpf = new Cpf('949.861.500-49');
    const result = cpf.validate();
    expect(result).toEqual(true);
  })

  it('should cpf is invalid when string lenght is 15', () => {
    expect(() => new Cpf('949.861.500-493')).toThrow(Error('Cpf length has to be equals 11 characters'));
  })

  it('should cpf is invalid when string is empty', () => {
    expect(() => new Cpf('')).toThrow(Error('Cpf length has to be equals 11 characters'));
  })

  it('should cpf is invalid when every character is equal', () => {
    expect(() => new Cpf('11111111111')).toThrow(Error('Cpf needs to have no repeated numbers'));
  })
})