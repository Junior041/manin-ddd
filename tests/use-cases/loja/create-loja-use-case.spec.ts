import { CreateLojaUseCase } from '@/domain/application/use-cases/loja/create-loja-use-case';
import { LojaAlreadyExists } from '@/domain/application/use-cases/_erros/loja-already-exists-error';
import { makeLoja } from 'tests/factories/makeLoja';
import { InMemoryLojaRepository } from 'tests/repositories/in-memory-loja-repository';

describe('LOJA - create', async() => {
	let inMemoryLojaRepository: InMemoryLojaRepository;
	let sut: CreateLojaUseCase;
	beforeEach(() => {
		inMemoryLojaRepository = new InMemoryLojaRepository();
		sut = new CreateLojaUseCase(inMemoryLojaRepository);
	});

	it('should create a new loja', async () => {
		const result = await sut.execute({
			cnpj: '12345678901234',
			razaoSocial: 'Teste Motors',
			ativo: true,
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryLojaRepository.items.length).toBe(1);
	});

	it('should not be able create loja with twice cnpj', async () => {
		inMemoryLojaRepository.items.push(makeLoja({cnpj:'12345678901234'}));
		const result = await sut.execute({
			cnpj: '12345678901234',
			razaoSocial: 'Teste Motors',
			ativo: true,
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(LojaAlreadyExists);
	});
});