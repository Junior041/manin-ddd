import { UpdateComponenteUseCase } from '@/domain/application/use-cases/componente/update-componente-use-case';
import { makeComponente } from 'tests/factories/makeComponente';
import { InMemoryComponenteRepository } from 'tests/repositories/in-memory-componente-repository';

describe('COMPONENTE - update', () => {
	let inMemoryComponenteRepository: InMemoryComponenteRepository;
	let sut: UpdateComponenteUseCase;
	beforeEach(() => {
		inMemoryComponenteRepository = new InMemoryComponenteRepository();
		sut = new UpdateComponenteUseCase(inMemoryComponenteRepository);
	});

	it('Deve ser possivel criar uma componente' , async() => {
		const componente = makeComponente();
		inMemoryComponenteRepository.items.push(componente);
		const result = await sut.execute({
			componenteId:componente.id.toString(),
			descricao: 'descricao alterada',
			identificador: '1398403',
			nome: 'Rolamento',
			valor: 9,
			valorUnitario: 'UNIDADE',

		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryComponenteRepository.items.length).toBe(1);
		expect(inMemoryComponenteRepository.items[0]).toEqual(
			expect.objectContaining({
				id:componente.id,
				descricao: 'descricao alterada',
				identificador: '1398403',
				nome: 'Rolamento',
				valor: 9,
				valorUnitario: 'UNIDADE',
			})
		);

	});
});