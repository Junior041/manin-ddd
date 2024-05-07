import { FindManutencaoByMaquinaExecutedUseCase } from '@/domain/application/use-cases/manutencao/find-manutencao-by-maquina-id-executed-use-case';
import { makeComponente } from 'tests/factories/makeComponente';
import { makeManutencao } from 'tests/factories/makeManutencao';
import { makeMaquina } from 'tests/factories/makeMaquina';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';
import { InMemoryManutencaoRepository } from 'tests/repositories/in-memory-manutencao-repository';

describe('MANUTENCAO - buscar as realizadas por maquina', async () => {
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let inMemoryManutencaoRepository: InMemoryManutencaoRepository;
	let sut: FindManutencaoByMaquinaExecutedUseCase;
	beforeEach(() => {
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		inMemoryManutencaoRepository = new InMemoryManutencaoRepository(inMemoryComponenteRepository);
		sut = new FindManutencaoByMaquinaExecutedUseCase(inMemoryManutencaoRepository);
	});

	it('Deve buscar as ja realizadas por maquinaId', async () => {
		const maquina = makeMaquina();
		const componente = makeComponente({ maquina: maquina });
		inMemoryComponenteRepository.items.push(componente);
		const manutencao1 = makeManutencao({
			componenteId: componente.id,
			dataRealizacao: new Date('2021-01-01')
		});
		const manutencao2 = makeManutencao();
		const manutencao3 = makeManutencao();
		
		const manutencao4 = makeManutencao({
			componenteId: componente.id,
			dataRealizacao: new Date('2021-01-01')
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
