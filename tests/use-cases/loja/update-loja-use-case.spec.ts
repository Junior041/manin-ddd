import { makeLoja } from 'tests/factories/makeLoja';
import { InMemoryLojaRepository } from 'tests/repositories/in-memory-loja-repository';
import { UpdateLojaUseCase } from '@/domain/application/use-cases/loja/update-loja-use-case';

describe('LOJA - update', async() => {
	let inMemoryLojaRepository: InMemoryLojaRepository;
	let sut: UpdateLojaUseCase;
	beforeEach(() => {
		inMemoryLojaRepository = new InMemoryLojaRepository();
		sut = new UpdateLojaUseCase(inMemoryLojaRepository);
	});

	it('should update a udpate loja', async () => {
		const loja = makeLoja({cnpj:'12345678901234'});
		inMemoryLojaRepository.items.push(loja);
		
		const result = await sut.execute({
			lojaId: loja.id.toString(),
			razaoSocial: 'Teste Motors',
			ativo: true,
		});
		
		expect(result.isRight()).toBe(true);
		
		expect(inMemoryLojaRepository.items).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					razaoSocial: 'Teste Motors',
				})
			])
		);
	});
});