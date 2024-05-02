import { CreateMaquinaUseCase } from '@/domain/application/use-cases/maquina/create-maquina-use-case';
import { makeLoja } from 'tests/factories/makeLoja';
import { InMemoryLojaRepository } from 'tests/repositories/in-memory-loja-repository';
import { InMemoryMaquinaRepository } from 'tests/repositories/in-memory-maquina-repository';

describe('MAQUINA - create', () => {
	let inMemoryMaquinaRepository: InMemoryMaquinaRepository;
	let inMemoryLojaRepository: InMemoryLojaRepository;
	let sut: CreateMaquinaUseCase;
	beforeEach(() => {
		inMemoryMaquinaRepository = new InMemoryMaquinaRepository();
		inMemoryLojaRepository = new InMemoryLojaRepository();
		sut = new CreateMaquinaUseCase(inMemoryMaquinaRepository,inMemoryLojaRepository);
	});

	it('Deve ser possivel criar uma maquina' , async() => {
		const loja = makeLoja();
		inMemoryLojaRepository.items.push(loja);
		const result = await sut.execute({
			lojaId: loja.id.toString(),
			marca: 'CAT',
			nome: 'Maquina Teste',
			codigo: '969984553218',
			dataAquisição: null,
			descricao: 'Maquina de teste',
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryMaquinaRepository.items.length).toBe(1);
		expect(inMemoryMaquinaRepository.items[0].codigo).toEqual('969984553218');

	});
});