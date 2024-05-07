import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FindNearbyManutencaoByComponenteUseCase } from '@/domain/application/use-cases/manutencao/find-nearby-manutencao-by-componente-use-case';
import { makeManutencao } from 'tests/factories/makeManutencao';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';
import { InMemoryManutencaoRepository } from 'tests/repositories/in-memory-manutencao-repository';

describe('MANUTENCAO - find nearby', async () => {
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let inMemoryManutencaoRepository: InMemoryManutencaoRepository;
	let sut: FindNearbyManutencaoByComponenteUseCase;
	beforeEach(() => {
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		inMemoryManutencaoRepository = new InMemoryManutencaoRepository(inMemoryComponenteRepository);
		sut = new FindNearbyManutencaoByComponenteUseCase(inMemoryManutencaoRepository);
	});

	it('Deve bsucar as proximas manutenções a serem feitas', async () => {
		const manutencao1 = makeManutencao({
			dataManutencao: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() + 1),
			componenteId: new UniqueEntityID('1')
		});
		const manutencao2 = makeManutencao({
			dataManutencao: new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate() + 1),
			componenteId: new UniqueEntityID('1')
		});
		const manutencao3 = makeManutencao({
			dataManutencao: new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate() + 1),
			componenteId: new UniqueEntityID('1')
		});
		const manutencao4 = makeManutencao({
			dataManutencao: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
			componenteId: new UniqueEntityID('1')
		});
		inMemoryManutencaoRepository.items.push(manutencao1);
		inMemoryManutencaoRepository.items.push(manutencao2);
		inMemoryManutencaoRepository.items.push(manutencao3);
		inMemoryManutencaoRepository.items.push(manutencao4);

		const result = await sut.execute({ componenteId: manutencao1.componenteId.toString(), params: { page: 1 } });

		expect(result.isRight()).toBeTruthy();
		expect(result.value?.manutencoes.length).toBe(3);
		expect(result.value?.manutencoes.map(m => m.dataManutencao)).toEqual(
			expect.arrayContaining([
				manutencao1.dataManutencao,
				manutencao3.dataManutencao,
				manutencao4.dataManutencao
			])
		);
        
	});
});
