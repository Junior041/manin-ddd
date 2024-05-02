import { CreateComponenteUseCase } from '@/domain/application/use-cases/componente/create-componente-use-case';
import { makeMaquina } from 'tests/factories/makeMaquina';
import { InMemoryMaquinaRepository } from 'tests/repositories/in-memory-maquina-repository';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';

describe('COMPONENTE - create', () => {
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let inMemoryMaquinaRepository: InMemoryMaquinaRepository;
	let sut: CreateComponenteUseCase;
	beforeEach(() => {
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		inMemoryMaquinaRepository = new InMemoryMaquinaRepository();
		sut = new CreateComponenteUseCase(inMemoryComponenteRepository,inMemoryMaquinaRepository);
	});

	it('Deve ser possivel criar uma componente' , async() => {
		const maquina = makeMaquina();
		inMemoryMaquinaRepository.items.push(maquina);
		const result = await sut.execute({
			maquinaId: maquina.id.toString(),
			descricao: 'descricao',
			identificador: null,
			nome: 'rolamento',
			valor: 10,
			valorUnitario: 'UNIDADE',
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryComponenteRepository.items.length).toBe(1);
		expect(inMemoryComponenteRepository.items[0].nome).toEqual('rolamento');

	});
});