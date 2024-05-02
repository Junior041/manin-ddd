import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FindComponentesByMaquinaUseCase } from '@/domain/application/use-cases/componente/find-componentes-by-maquina-use-case';
import { makeComponente } from 'tests/factories/makeComponente';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';

describe('COMPONENTE - find by maquina', () => {
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let sut: FindComponentesByMaquinaUseCase;

	beforeEach(() => {
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		sut = new FindComponentesByMaquinaUseCase(inMemoryComponenteRepository);
	});

	it('Deve ser possivel buscar componentes por maquina', async () => {
		for (let index = 1; index <= 25; index++) {
			inMemoryComponenteRepository.items.push(makeComponente({ maquinaId: new UniqueEntityID('maquina-id') }));
		}
		const result = await sut.execute({ maquinaId: 'maquina-id', params: { page: 1 } });
		expect(result.value?.componentes.length).toEqual(20);
		
		const result2 = await sut.execute({ maquinaId: 'maquina-id', params: { page: 2 } });
		expect(result2.value?.componentes.length).toEqual(5);
        
	});
});
