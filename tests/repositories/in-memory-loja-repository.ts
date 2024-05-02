import { PaginationParams } from '@/core/repositories/pagination-params';
import { Loja } from '@/domain/enterprise/entities/loja.entity';
import { LojaRepository } from '@/domain/application/repositories/loja-repository';

export class InMemoryLojaRepository extends LojaRepository {
	public items: Loja[] = [];

	async create(data: Loja): Promise<void> {
		this.items.push(data);
	}

	async save(data: Loja) {
		const itemIndex = this.items.findIndex((item) => item.id === data.id);
		this.items[itemIndex] = data;
	}

	async getAll({ page }: PaginationParams): Promise<Loja[]> {
		const lojas = this.items
			.slice((page - 1) * 20, page * 20);
		return lojas;
	}

	async findByCnpj(cnpj: string): Promise<Loja | null> {
		const loja = this.items.find((loja) => loja.cnpj === cnpj);    
		if (!loja) {
			return null;
		}
		return loja;
	}

	async findById(id: string): Promise<Loja | null> {
		const loja = this.items.find((loja) => loja.id.toString() === id);    
		if (!loja) {
			return null;
		}
		return loja;
	}

	async alterStatusLoja(lojaId: string): Promise<void> {
		const loja = this.items.find((loja) => loja.id.toString() === lojaId);
		if (!loja) {
			throw new Error();
		}

		loja.ativo = !loja.ativo;

		const itemIndex = this.items.findIndex((item) => item.id.toString() === lojaId);
		this.items[itemIndex] = loja;
	}
	
}