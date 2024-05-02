import { PaginationParams } from '@/core/repositories/pagination-params';
import { ComponenteRepository } from '@/domain/application/repositories/componente-repository';
import { Componente } from '@/domain/enterprise/entities/componente.entity';

export class InMemoryComponenteRepository extends ComponenteRepository {
	public items: Componente[] = [];
	async create(data: Componente): Promise<void> {
		this.items.push(data);
	}

	async findByMaquinaId(maquinaId: string, { page }: PaginationParams): Promise<Componente[]> {
		const componente = this.items.filter((item) => item.maquinaId.toString() == maquinaId).slice((page - 1) * 20, page * 20);
		return componente;
	}

	async findAllByMaquinaId(maquinaId: string): Promise<Componente[]> {
		const componente = this.items.filter((item) => item.maquinaId.toString() == maquinaId);
		return componente;
	}

	async findById(Id: string): Promise<Componente | null> {
		const componente = this.items.find((item) => item.id.toString() == Id);
		return Promise.resolve(componente || null);
	}

	async save(data: Componente) {
		const itemIndex = this.items.findIndex((item) => item.id === data.id);
		this.items[itemIndex] = data;
	}

}
