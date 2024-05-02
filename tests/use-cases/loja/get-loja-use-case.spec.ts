import { makeLoja } from 'tests/factories/makeLoja';
import { InMemoryLojaRepository } from 'tests/repositories/in-memory-loja-repository';
import { GetAllLojaUseCase } from '@/domain/application/use-cases/loja/get-all-loja-use-case';

describe('LOJA - get', async() => {
	let inMemoryLojaRepository: InMemoryLojaRepository;
	let sut: GetAllLojaUseCase;
	beforeEach(() => {
		inMemoryLojaRepository = new InMemoryLojaRepository();
		sut = new GetAllLojaUseCase(inMemoryLojaRepository);
	});

	it('should be return array of lojas', async () => {
		for (let i = 0; i < 25; i++) {
			inMemoryLojaRepository.items.push(makeLoja());
		}
		const result = await sut.execute({ params: { page: 2 } });

		expect(result.isRight()).toEqual(true);
		expect(result.value?.lojas.length).toEqual(5);
		expect(result.value?.lojas).toEqual(inMemoryLojaRepository.items.slice(20, 25));

	});
});