import { FindManutencaoNearbyByMaquinaUseCase } from '@/domain/application/use-cases/manutencao/find-manutencao-nearby-by-maquina-use-case';
import { makeComponente } from 'tests/factories/makeComponente';
import { makeManutencao } from 'tests/factories/makeManutencao';
import { makeMaquina } from 'tests/factories/makeMaquina';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';
import { InMemoryManutencaoRepository } from 'tests/repositories/in-memory-manutencao-repository';

describe('MANUTENCAO - buscar as proximas manutencoes por maquina', async () => {
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let inMemoryManutencaoRepository: InMemoryManutencaoRepository;
	let sut: FindManutencaoNearbyByMaquinaUseCase;
	beforeEach(() => {
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		inMemoryManutencaoRepository = new InMemoryManutencaoRepository(inMemoryComponenteRepository);
		sut = new FindManutencaoNearbyByMaquinaUseCase(inMemoryManutencaoRepository);
	});

	it('Deve buscar as proximas manutenções por maquina', async () => {
		const maquina = makeMaquina();
		const componente = makeComponente({ maquinaId: maquina.id });
		inMemoryComponenteRepository.items.push(componente);
		const manutencao1 = makeManutencao({
			componenteId: componente.id,
		});
		const manutencao2 = makeManutencao();
		const manutencao3 = makeManutencao();
		
		const manutencao4 = makeManutencao({
			componenteId: componente.id,
		});
		inMemoryManutencaoRepository.items.push(manutencao1);
		inMemoryManutencaoRepository.items.push(manutencao2);
		inMemoryManutencaoRepository.items.push(manutencao3);
		inMemoryManutencaoRepository.items.push(manutencao4);

		const result = await sut.execute({ maquinaId: maquina.id.toString(), params: { page: 1 } });
		
		expect(result.isRight()).toBeTruthy();
		expect(result.value?.manutencoes.length).toBe(2);
		expect(result.value?.manutencoes.map(m => m.dataManutencao)).toEqual(
			expect.arrayContaining([
				manutencao1.dataManutencao,
				manutencao4.dataManutencao
			])
		);
        
	});
});
