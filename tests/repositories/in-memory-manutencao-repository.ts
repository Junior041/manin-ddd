import { PaginationParams } from '@/core/repositories/pagination-params';
import { ManutencaoRepository } from '@/domain/application/repositories/manutencao-repository';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { InMemoryComponenteRepository } from './in-memory-componente-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class InMemoryManutencaoRepository extends ManutencaoRepository{
	public items: Manutencao[] = [];

	constructor(private readonly componenteRepository: InMemoryComponenteRepository){
		super();
	}

	async create(data: Manutencao): Promise<void> {
		this.items.push(data);
	}
	async findById(id: string): Promise<Manutencao | null> {	
		const manutencao = this.items.find((item) => item.id.toString() === id);
		return manutencao || null;
	}
	async findBycomponenteId(componenteId: string, {page}: PaginationParams): Promise<Manutencao[]> {
		const manutencoes = this.items.filter((item) => item.componenteId.toString() === componenteId)
			.slice((page - 1) * 20, page * 20);
		return manutencoes;
	}
	async findNearbyBycomponenteId(componenteId: string, {page}: PaginationParams): Promise<Manutencao[]> {
		const manutencoes = this.items.filter((item) => item.componenteId.toString() === componenteId && item.dataManutencao >= new Date())
			.slice((page - 1) * 20, page * 20).sort((a,b) => a.dataManutencao.getTime() - b.dataManutencao.getTime());
		return manutencoes;
	}
	async findBycomponenteIdPeriod(componenteId: string, startDate: Date, endDate: Date, {page}: PaginationParams): Promise<Manutencao[]> {
		const manutencoes = this.items.filter((item) => item.componenteId.toString() === componenteId && item.dataManutencao >= startDate && item.dataManutencao <= endDate)
			.slice((page - 1) * 20, page * 20).sort((a,b) => a.dataManutencao.getTime() - b.dataManutencao.getTime());
		return manutencoes;
	}
	async findByNearbyMaquinaId(maquinaId: string, {page}: PaginationParams): Promise<Manutencao[]> {
		// Busca os componentes associados à máquina específica
		const componentes = await this.componenteRepository.findAllByMaquinaId(maquinaId);
		// Obtém os IDs dos componentes
		const componenteIds = componentes.map(componente => componente.id.toString());
		// Filtra as manutenções relacionadas apenas aos componentes obtidos
		const manutencoes = this.items
			.filter(item => {
				// Verifica se o ID do componente do item está presente nos IDs dos componentes obtidos
				return componenteIds.includes(item.componenteId.toString()) &&
					(
						// Data de manutenção programada é igual ou posterior à data atual
						item.dataManutencao >= new Date() ||
						// Ou, se a data de realização for nula ou indefinida, a data de manutenção programada pode ser anterior à data atual
						((item.dataRealizacao == null || item.dataRealizacao === undefined) && item.dataManutencao < new Date())
					);
			})
			.slice((page - 1) * 20, page * 20)
			.sort((a, b) => a.dataManutencao.getTime() - b.dataManutencao.getTime());
		return manutencoes;
	}
	async setManutencaoAsExecuted(manutencaoId: string, usuarioId: string): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id.toString() === manutencaoId);
		this.items[itemIndex].dataRealizacao = new Date();
		this.items[itemIndex].realizadaPor = new UniqueEntityID(usuarioId);
	}
	async findByMaquinaIdExecuted(maquinaId: string, {page}: PaginationParams): Promise<Manutencao[]> {
		const componentes = await this.componenteRepository.findAllByMaquinaId(maquinaId);
		const manutencoes = this.items
			.filter((item) => componentes.some((componente) => componente.id.toString() === item.componenteId.toString()) && item.dataRealizacao !== null)
			.slice((page - 1) * 20, page * 20);
		return manutencoes;
	}
	async findByRealizadaPor(realizadaPor: string, {page}: PaginationParams): Promise<Manutencao[]> {
		const manutencoes = this.items.filter((item) => item.realizadaPor && item.realizadaPor.toString() === realizadaPor)
			.slice((page - 1) * 20, page * 20);
		return manutencoes;
	}
}