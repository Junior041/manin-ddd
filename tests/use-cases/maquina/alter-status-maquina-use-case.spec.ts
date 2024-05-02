import { AlterStatusMaquinaUseCase } from '@/domain/application/use-cases/maquina/alter-status-maquina-use-case';
import { makeMaquina } from 'tests/factories/makeMaquina';
import { InMemoryMaquinaRepository } from 'tests/repositories/in-memory-maquina-repository';

describe('MAQUINA - alter status', async() => {
	let inMemoryMaquinaRepository: InMemoryMaquinaRepository;
	let sut: AlterStatusMaquinaUseCase;
	beforeEach(() => {
		inMemoryMaquinaRepository = new InMemoryMaquinaRepository();
		sut = new AlterStatusMaquinaUseCase(inMemoryMaquinaRepository);

		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('deve ser possivel desativar uma maquina', async () => {
		const user = makeMaquina({
			dataInativacao: null
		});
		inMemoryMaquinaRepository.items.push(user);
		vi.setSystemTime(new Date(2021, 1, 1, 0, 0, 0, 0));
		const response = await sut.execute({
			idMaquina: user.id.toString()
		});

		expect(response.isRight()).toBe(true);
		const maquinaInDatabase = await inMemoryMaquinaRepository.findById(user.id.toString());
		
		expect(maquinaInDatabase?.dataInativacao).not.toBeNull();
		expect(maquinaInDatabase?.dataInativacao).toEqual(new Date(2021, 1, 1, 0, 0, 0, 0));
	});

	it('deve ser possivel ativar uma maquina', async () => {
		const user = makeMaquina({
			dataInativacao: new Date(2021, 1, 1, 0, 0, 0, 0)
		});
		
		inMemoryMaquinaRepository.items.push(user);

		const response = await sut.execute({
			idMaquina: user.id.toString()
		});

		expect(response.isRight()).toBe(true);

		const maquinaInDatabase = await inMemoryMaquinaRepository.findById(user.id.toString());
		expect(maquinaInDatabase?.dataInativacao).toBeNull();
	});

});