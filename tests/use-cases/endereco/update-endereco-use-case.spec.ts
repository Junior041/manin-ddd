import { UpdateEnderecoUseCase } from '@/domain/application/use-cases/endereco/update-endereco-use-case';
import { makeEndereco } from 'tests/factories/makeEndereco';
import { InMemoryEnderecoRepository } from 'tests/repositories/in-memory-endereco-repository';

describe('ENDERECO - update', async() => {
	let inMemoryEnderecoRepository: InMemoryEnderecoRepository;
	let sut: UpdateEnderecoUseCase;
	beforeEach(() => {
		inMemoryEnderecoRepository = new InMemoryEnderecoRepository();
		sut = new UpdateEnderecoUseCase(inMemoryEnderecoRepository);
	});

	it('should be able create a update endereco', async () => {
		const endereco = makeEndereco();
		inMemoryEnderecoRepository.create(endereco);
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
			enderecoId: endereco.id.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryEnderecoRepository.items.length).toBe(1);

		expect(inMemoryEnderecoRepository.items).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
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
				})
			])
		);
		
	});


});