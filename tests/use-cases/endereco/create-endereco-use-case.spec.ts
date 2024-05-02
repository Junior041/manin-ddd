import { CreateEnderecoUseCase } from '@/domain/application/use-cases/endereco/create-endereco-use-case';
import { makeLoja } from 'tests/factories/makeLoja';
import { InMemoryEnderecoRepository } from 'tests/repositories/in-memory-endereco-repository';
import { InMemoryLojaRepository } from 'tests/repositories/in-memory-loja-repository';

describe('ENDERECO - create', async() => {
	let inMemoryEnderecoRepository: InMemoryEnderecoRepository;
	let inMemoryLojaRepository: InMemoryLojaRepository;
	let sut: CreateEnderecoUseCase;
	beforeEach(() => {
		inMemoryEnderecoRepository = new InMemoryEnderecoRepository();
		inMemoryLojaRepository = new InMemoryLojaRepository();
		sut = new CreateEnderecoUseCase(inMemoryEnderecoRepository, inMemoryLojaRepository);
	});

	it('should be able create a new endereco', async () => {
		const loja = makeLoja();
		inMemoryLojaRepository.create(loja);
		const result = await sut.execute({
			bairro: 'Joselino Bressiani',
			cep: '88999696',
			cidade: 'Araguaci',
			complemeto: 'Em frente ao mercaod',
			endereco: 'Rua Ademir Valdemiro',
			estado: 'SC',
			latitude: -85.5759,
			longitude: -173.1697,
			numero: 'n 40',
			principal: true,
			referenceId: loja.id.toString(),
		});
		expect(result.isRight()).toBe(true);
		expect(inMemoryEnderecoRepository.items.length).toBe(1);
	});

});