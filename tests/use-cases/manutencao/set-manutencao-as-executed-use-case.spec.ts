import { SetManutencaoAsExecutedUseCase } from '@/domain/application/use-cases/manutencao/set-manutencao-as-executed-use-case';
import { makeManutencao } from 'tests/factories/makeManutencao';
import { makeUsuario } from 'tests/factories/makeUsuario';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';
import { InMemoryManutencaoRepository } from 'tests/repositories/in-memory-manutencao-repository';
import { InMemoryUsuarioRepository } from 'tests/repositories/in-memory-usuario-repoitory';

describe('MANUTENCAO - finalizar', async () => {
	let inMemoryUsuarioRepository: InMemoryUsuarioRepository;
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let inMemoryManutencaoRepository: InMemoryManutencaoRepository;
	let sut: SetManutencaoAsExecutedUseCase;
	beforeEach(() => {
		inMemoryUsuarioRepository = new InMemoryUsuarioRepository();
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		inMemoryManutencaoRepository = new InMemoryManutencaoRepository(inMemoryComponenteRepository);
		sut = new SetManutencaoAsExecutedUseCase(inMemoryManutencaoRepository,inMemoryUsuarioRepository);
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('Deve finalizar uma manutenção', async () => {
		vi.setSystemTime(new Date('2021-01-01'));
		const usuario = makeUsuario();
		inMemoryUsuarioRepository.items.push(usuario);
		
		const manutencao = makeManutencao();
		inMemoryManutencaoRepository.items.push(manutencao);

		const result = await sut.execute({ manutencaoId: manutencao.id.toString(),usuarioId: usuario.id.toString()});
		
		expect(result.isRight()).toBeTruthy();
		expect(inMemoryManutencaoRepository.items[0].realizadaPor?.toValue()).toBe(usuario.id.toValue());
		expect(inMemoryManutencaoRepository.items[0].dataRealizacao).toEqual(new Date('2021-01-01'));
	});
});
