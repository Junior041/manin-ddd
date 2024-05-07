import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FindManutencaoByComponenteAndPeriodoUseCase } from '@/domain/application/use-cases/manutencao/find-manutencao-by-component-and-period';
import { makeManutencao } from 'tests/factories/makeManutencao';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';
import { InMemoryManutencaoRepository } from 'tests/repositories/in-memory-manutencao-repository';

describe('MANUTENCAO - bsuca por componente e periodo', async () => {
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let inMemoryManutencaoRepository: InMemoryManutencaoRepository;
	let sut: FindManutencaoByComponenteAndPeriodoUseCase;
	beforeEach(() => {
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		inMemoryManutencaoRepository = new InMemoryManutencaoRepository(inMemoryComponenteRepository);
		sut = new FindManutencaoByComponenteAndPeriodoUseCase(inMemoryManutencaoRepository);
	});

	it('Deve bsucar as proximas manutenções a serem feitas em um componente por periodo', async () => {
		const manutencao1 = makeManutencao({
			dataManutencao: new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate() + 1),
			componenteId: new UniqueEntityID('1')
		});
		const manutencao2 = makeManutencao({
			dataManutencao: new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate() + 1),
			componenteId: new UniqueEntityID('1')
		});
		const manutencao3 = makeManutencao({
			dataManutencao: new Date(new Date().getFullYear(), new Date().getMonth() - 2, new Date().getDate() + 1),
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

		const result = await sut.execute({ 
			componenteId: '1', 
			startDate: 	null, 
			endDate: 	new Date(new Date().getFullYear(), new Date().getMonth() + 4, new Date().getDate() + 1),
			params: { page: 1 } 
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value?.manutencoes.length).toBe(3);
		expect(result.value?.manutencoes.map(m => m.dataManutencao)).toEqual(
			expect.arrayContaining([
				manutencao1.dataManutencao,
				manutencao2.dataManutencao,
				manutencao4.dataManutencao
			])
		);
        
	});
});
