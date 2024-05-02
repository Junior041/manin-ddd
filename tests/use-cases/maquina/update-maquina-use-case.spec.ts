import { UpdateMaquinaUseCase } from '@/domain/application/use-cases/maquina/update-maquina-use-case';
import { makeMaquina } from 'tests/factories/makeMaquina';
import { InMemoryMaquinaRepository } from 'tests/repositories/in-memory-maquina-repository';

describe('MAQUINA - update', () => {
	let inMemoryMaquinaRepository: InMemoryMaquinaRepository;
	let sut: UpdateMaquinaUseCase;
	beforeEach(() => {
		inMemoryMaquinaRepository = new InMemoryMaquinaRepository();
		sut = new UpdateMaquinaUseCase(inMemoryMaquinaRepository);
	});

	it('Deve ser possivel criar uma maquina' , async() => {
		const maquina = makeMaquina();
		inMemoryMaquinaRepository.items.push(maquina);
		const result = await sut.execute({
			maquinaId:maquina.id.toString(),
			marca: 'MARCA NOVA',
			nome: 'NOME NOVO',
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryMaquinaRepository.items.length).toBe(1);
		expect(inMemoryMaquinaRepository.items[0]).toEqual(
			expect.objectContaining({
				id:maquina.id,
				marca: 'MARCA NOVA',
				nome: 'NOME NOVO',
			})
		);

	});
});