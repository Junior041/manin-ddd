import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FindMaquinasByLojaUseCase } from '@/domain/application/use-cases/maquina/find-maquinas-by-loja-use-case';
import { makeMaquina } from 'tests/factories/makeMaquina';
import { InMemoryMaquinaRepository } from 'tests/repositories/in-memory-maquina-repository';

describe('MAQUINA - find by loja', () => {
	let inMemoryMaquinaRepository: InMemoryMaquinaRepository;
	let sut: FindMaquinasByLojaUseCase;

	beforeEach(() => {
		inMemoryMaquinaRepository = new InMemoryMaquinaRepository();
		sut = new FindMaquinasByLojaUseCase(inMemoryMaquinaRepository);
	});

	it('Deve ser possivel buscar maquinas por loja', async () => {
		for (let index = 1; index <= 25; index++) {
			inMemoryMaquinaRepository.items.push(makeMaquina({ lojaId: new UniqueEntityID('loja-id') }));
		}
		const result = await sut.execute({ lojaId: 'loja-id', params: { page: 1 } });
		expect(result.value?.maquinas.length).toEqual(20);
		
		const result2 = await sut.execute({ lojaId: 'loja-id', params: { page: 2 } });
		expect(result2.value?.maquinas.length).toEqual(5);
        
	});
});
