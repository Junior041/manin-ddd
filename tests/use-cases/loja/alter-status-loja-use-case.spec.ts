import { makeLoja } from 'tests/factories/makeLoja';
import { InMemoryLojaRepository } from 'tests/repositories/in-memory-loja-repository';
import { AlterStatusUseCase } from '@/domain/application/use-cases/loja/alter-status-loja-use-case';

describe('LOJA - alter status', async() => {
	let inMemoryLojaRepository: InMemoryLojaRepository;
	let sut: AlterStatusUseCase;
	beforeEach(() => {
		inMemoryLojaRepository = new InMemoryLojaRepository();
		sut = new AlterStatusUseCase(inMemoryLojaRepository);
	});

	it('shold be able inativate loja', async () => {
		const loja = makeLoja({ativo:true});
		inMemoryLojaRepository.items.push(loja);
		
		const result = await sut.execute({lojaId: loja.id.toString()});
		
		expect(result.isRight()).toBe(true);
		expect(inMemoryLojaRepository.items[0].ativo).toEqual(false);
	});

	it('shold be able ativate loja', async () => {
		const loja = makeLoja({ativo:false});
		inMemoryLojaRepository.items.push(loja);
		
		const result = await sut.execute({lojaId: loja.id.toString()});
		
		expect(result.isRight()).toBe(true);
		expect(inMemoryLojaRepository.items[0].ativo).toEqual(true);
	});
});