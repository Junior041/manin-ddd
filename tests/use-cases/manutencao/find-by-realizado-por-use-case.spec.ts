import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FindByRealizadaPorUseCase } from '@/domain/application/use-cases/manutencao/find-by-realizada-por-use-case';
import { makeManutencao } from 'tests/factories/makeManutencao';
import { makeUsuario } from 'tests/factories/makeUsuario';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';
import { InMemoryManutencaoRepository } from 'tests/repositories/in-memory-manutencao-repository';
import { InMemoryUsuarioRepository } from 'tests/repositories/in-memory-usuario-repoitory';

describe('MANUTENCAO - buscar por realizador', async () => {
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let inMemoryManutencaoRepository: InMemoryManutencaoRepository;
	let inMemoryUsuariorepository: InMemoryUsuarioRepository;
	let sut: FindByRealizadaPorUseCase;
	beforeEach(() => {
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		inMemoryManutencaoRepository = new InMemoryManutencaoRepository(inMemoryComponenteRepository);
		inMemoryUsuariorepository = new InMemoryUsuarioRepository();
		sut = new FindByRealizadaPorUseCase(inMemoryManutencaoRepository);
	});

	it('Deve bsucar as manutenções realizadas por um usuario', async () => {
		const usuario = makeUsuario();
		inMemoryUsuariorepository.items.push(usuario);
		const manutencao1 = makeManutencao({
			componenteId: new UniqueEntityID('1'),
			realizadaPor: usuario.id
		});
		const manutencao2 = makeManutencao({
			componenteId: new UniqueEntityID('1')
		});
		const manutencao3 = makeManutencao({
			componenteId: new UniqueEntityID('1')
		});
		const manutencao4 = makeManutencao({
			componenteId: new UniqueEntityID('1'),
			realizadaPor: usuario.id
		});
		inMemoryManutencaoRepository.items.push(manutencao1);
		inMemoryManutencaoRepository.items.push(manutencao2);
		inMemoryManutencaoRepository.items.push(manutencao3);
		inMemoryManutencaoRepository.items.push(manutencao4);

		const result = await sut.execute({ realizadoPor: usuario.id.toString(), params: { page: 1 } });

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
