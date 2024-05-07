import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FindManutencaoByIdUseCase } from '@/domain/application/use-cases/manutencao/find-manutencao-by-id-use-case';
import { makeManutencao } from 'tests/factories/makeManutencao';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';
import { InMemoryManutencaoRepository } from 'tests/repositories/in-memory-manutencao-repository';

describe('MANUTENCAO - bsuca por id', async () => {
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let inMemoryManutencaoRepository: InMemoryManutencaoRepository;
	let sut: FindManutencaoByIdUseCase;
	beforeEach(() => {
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		inMemoryManutencaoRepository = new InMemoryManutencaoRepository(inMemoryComponenteRepository);
		sut = new FindManutencaoByIdUseCase(inMemoryManutencaoRepository);
	});

	it('Deve buscar uma manutencao', async () => {
		const manutencao = makeManutencao({
			componenteId: new UniqueEntityID('1')
		});
		inMemoryManutencaoRepository.items.push(manutencao);
		const result = await sut.execute({ 
			manutencaoId: manutencao.id.toString(), 
		});
		expect(result.isRight()).toBeTruthy();
		expect(result.value?.manutencao?.id.toString()).toBe(manutencao.id.toString());
        
	});
});
