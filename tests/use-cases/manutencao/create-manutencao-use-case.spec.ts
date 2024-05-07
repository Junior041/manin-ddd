import { CreateManutencaoUseCase } from '@/domain/application/use-cases/manutencao/create-manutencao-use-case';
import { makeComponente } from 'tests/factories/makeComponente';
import { makeLoja } from 'tests/factories/makeLoja';
import { makeUsuario } from 'tests/factories/makeUsuario';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';
import { InMemoryLojaRepository } from 'tests/repositories/in-memory-loja-repository';
import { InMemoryManutencaoRepository } from 'tests/repositories/in-memory-manutencao-repository';
import { InMemoryUsuarioRepository } from 'tests/repositories/in-memory-usuario-repoitory';

describe('MANUTENCAO - crete', async () => {
	let inMemoryLojaRepository: InMemoryLojaRepository;
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let inMemoryManutencaoRepository: InMemoryManutencaoRepository;
	let inMemoryUsuarioRepository: InMemoryUsuarioRepository;
	let sut: CreateManutencaoUseCase;
	beforeEach(() => {
		inMemoryLojaRepository = new InMemoryLojaRepository();
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		inMemoryManutencaoRepository = new InMemoryManutencaoRepository(inMemoryComponenteRepository);
		inMemoryUsuarioRepository = new InMemoryUsuarioRepository();
		sut = new CreateManutencaoUseCase(inMemoryManutencaoRepository, inMemoryLojaRepository, inMemoryComponenteRepository, inMemoryUsuarioRepository);
	});

	it('Deve ser possivel criar uma manutenção', async () => {
		const loja = makeLoja();
		const componente = makeComponente();
		const usuario = makeUsuario({ lojaId: loja.id });

		inMemoryLojaRepository.items.push(loja);
		inMemoryComponenteRepository.items.push(componente);
		inMemoryUsuarioRepository.items.push(usuario);

		const result = await sut.execute({
			compontentId: componente.id.toString(),
			dataManutencao: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
			lojaId: loja.id.toString(),
			tipoManutencao: 'PREVENTIVA',
			urgencia: 1,
			dataRealizacao: null,
			realizadaPor: null,
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryManutencaoRepository.items.length).toBe(1);
	});
});
