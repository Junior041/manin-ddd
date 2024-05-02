import { PaginationParams } from '@/core/repositories/pagination-params';
import { MaquinaRepository } from '@/domain/application/repositories/maquina-repository';
import { Maquina } from '@/domain/enterprise/entities/maquina.entity';

export class InMemoryMaquinaRepository extends MaquinaRepository {
	public items: Maquina[] = [];
	async create(data: Maquina): Promise<void> {
		this.items.push(data);
	}

	async findByLojaId(lojaId: string, { page }: PaginationParams): Promise<Maquina[]> {
		const maquina = this.items.filter((item) => item.lojaId.toString() == lojaId).slice((page - 1) * 20, page * 20);
		return maquina;
	}

	async findById(Id: string): Promise<Maquina | null> {
		const maquina = this.items.find((item) => item.id.toString() == Id);
		return Promise.resolve(maquina || null);
	}

	async save(data: Maquina) {
		const itemIndex = this.items.findIndex((item) => item.id === data.id);
		this.items[itemIndex] = data;
	}
}
