import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FindManutencaoByLojaidInAtualMonthNotExecutedUseCase } from '@/domain/application/use-cases/manutencao/find-manutencao-by-loja-id-atual-month-not-executed-use-case';
import { makeManutencao } from 'tests/factories/makeManutencao';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';
import { InMemoryManutencaoRepository } from 'tests/repositories/in-memory-manutencao-repository';

describe('MANUTENCAO - buscar por loja id no mes nao executada', async () => {
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let inMemoryManutencaoRepository: InMemoryManutencaoRepository;
	let sut: FindManutencaoByLojaidInAtualMonthNotExecutedUseCase;
	beforeEach(() => {
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		inMemoryManutencaoRepository = new InMemoryManutencaoRepository(inMemoryComponenteRepository);
		sut = new FindManutencaoByLojaidInAtualMonthNotExecutedUseCase(inMemoryManutencaoRepository);
	});
	it('Deve as manutenções do mes, e as que nao foram realizadas', async () => {
		const lojaId = new UniqueEntityID('1');
		const manutencao1 = makeManutencao({
			lojaId,
			dataManutencao: new Date(2022, 1, 1),
			dataRealizacao: new Date(2022, 1)
		});
		const manutencao2 = makeManutencao({
			lojaId,
			dataManutencao: new Date()
		});
		const manutencao3 = makeManutencao({
			lojaId,
			dataManutencao: new Date(2022, 1, 1),
		});
		const manutencao4 = makeManutencao({
			lojaId,
			dataManutencao: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
		});
		inMemoryManutencaoRepository.items.push(manutencao1);
		inMemoryManutencaoRepository.items.push(manutencao2);
		inMemoryManutencaoRepository.items.push(manutencao3);
		inMemoryManutencaoRepository.items.push(manutencao4);

		const result = await sut.execute({ 
			lojaId: '1', 
		
			params: { page: 1 } 
		});
		
		expect(result.isRight()).toBeTruthy();
		expect(result.value?.manutencoes.length).toBe(2);
		expect(result.value?.manutencoes.map(m => m.dataManutencao)).toEqual(
			expect.arrayContaining([
				manutencao2.dataManutencao,
				manutencao3.dataManutencao
			])
		);
        
	});
});
