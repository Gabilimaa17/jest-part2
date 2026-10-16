const sistema = require('./sistema'); 

describe(' Verifica se uma palavra é lida da mesma forma de trás para frente', () => {
  test('Testar palavras palíndromas e não palíndromas', () => {
    expect(sistema.ehPalindromo('arara')).toBe(true);
    expect(sistema.ehPalindromo('ovo')).toBe(true);
    expect(sistema.ehPalindromo('radar')).toBe(true);
    expect(sistema.ehPalindromo('javascript')).toBe(false);
  });
});


describe('Contador de Vogais', () => {
  test('Contar vogais em uma string', () => {
    expect(sistema.contarVogais('escola')).toBe(3);
    expect(sistema.contarVogais('xyz')).toBe(0);
    });
})
// exercicio 3
describe('Calculadora de Fatorial', () => {
  test('Calcular fatorial de números positivos', () => {
    expect(sistema.calcularFatorial(5)).toBe(120);
    expect(sistema.calcularFatorial(0)).toBe(1);
    expect(() => sistema.calcularFatorial(-2)).toThrow('Não existe fatorial de número negativo');
  });
})


describe('Removedor de Duplicatas', () => {
  test('Remover duplicatas de um array', () => {
    expect(sistema.removerDuplicatas([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
  });
})



describe('Validador de Agendamento (Dias Úteis)', () => {
  test('Agendar consulta em dias úteis e finais de semana', () => {
    expect(sistema.agendarConsulta(new Date(2026, 9, 19))).toBe('Consulta agendada com sucesso'); 
    expect(() =>sistema.agendarConsulta(new Date(2026, 9, 17))).toThrow('Clínica fechada aos finais de semana'); 
     
});
})
    
describe('Formatador de Moeda Brasileira Simplificado', () => {
  test('Formatar valores monetários', () => {
    expect(sistema.formatarMoeda(15.5)).toBe('R$ 15,50');
    expect(sistema.formatarMoeda(100)).toBe('R$ 100,00');
    expect(() => sistema.formatarMoeda('abc')).toThrow('Valor inválido');
  });
})


describe('Validador de CPF Básico (Tamanho e Repetição)', () => {
  test('Validar CPF com 11 dígitos e não repetidos', () => {
    expect(sistema.validarCpfBasico('12345678901')).toBe(true);
    expect(sistema.validarCpfBasico('11111111111')).toBe(false);
  });
})



describe('calcularIngresso', () => {
  test('deve cobrar valor inteiro (40) para adulto não estudante em dia comum', () => {
    expect(sistema.calcularIngresso(25, false, 1)).toBe(40);
    expect(sistema.calcularIngresso(20, true, 2)).toBe(20);
    expect(sistema.calcularIngresso(65, true, 3)).toBe(20);
});
})


describe( 'Conta Bancária', () => {
  let ContaBancaria;
  beforeEach(() => {
    ContaBancaria = sistema.ContaBancaria;
  });
  test('deve iniciar com saldo zerado e realizar depósitos corretamente', () => {
    const conta = new ContaBancaria('Maria');
    expect(conta.obterSaldo()).toBe(0);
    conta.depositar(100);
    expect(conta.obterSaldo()).toBe(100);
  });
  test('deve permitir saques dentro do limite do saldo', () => {
    const conta = new ContaBancaria('Maria');
    conta.depositar(100);
    conta.sacar(40);
    expect(conta.obterSaldo()).toBe(60);
  });
  test('deve proibir depósitos negativos/nulos e saques acima do saldo disponível', () => {
    const conta = new ContaBancaria('Maria');
    expect(() => conta.depositar(0)).toThrow('Valor de depósito deve ser positivo');
    expect(() => conta.sacar(50)).toThrow('Saldo insuficiente');
  });
});

describe('Clima ', () => {
  test('deve retornar a mensagem com a temperatura em caso de sucesso', async () => {
    const servicoClimaMock = {
      buscar: jest.fn().mockResolvedValue({ temperatura: 28 })
    };
    const resultado = await sistema.obterClima('São Paulo', servicoClimaMock);
    expect(resultado).toBe('A temperatura em São Paulo é de 28°C');
    expect(servicoClimaMock.buscar).toHaveBeenCalledWith('São Paulo');
  });
  test('deve tratar a falha do serviço e lançar exceção', async () => {
    const servicoClimaMock = {
      buscar: jest.fn().mockRejectedValue(new Error('API Indisponível'))
    };
    await expect(sistema.obterClima('São Paulo', servicoClimaMock))
      .rejects
      .toThrow('Falha ao buscar dados climáticos');
  });
});