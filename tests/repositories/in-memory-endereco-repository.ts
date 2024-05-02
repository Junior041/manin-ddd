import { Endereco } from '@/domain/enterprise/entities/endereco.entity';
import { EnderecoRepository } from '@/domain/application/repositories/endereco-repository';

export class InMemoryEnderecoRepository extends EnderecoRepository {
	public items: Endereco[] = [];

	async create(data: Endereco): Promise<void> {
		this.items.push(data);
	}

	async delete(enderecoId: string): Promise<void> {
		this.items = this.items.filter((item) => item.id.toString() !== enderecoId);
	}

	async save(data: Endereco): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === data.id);
		this.items[itemIndex] = data;
	}

	async findById(idEndereco: string): Promise<Endereco | null> {
		const endereco = this.items.find((item) => item.id.toString() === idEndereco);
		if (!endereco) {
			return null;
		}
		return endereco;
	}

	async findByReferenceId(referenceId: string): Promise<Endereco[]> {
		const endereco = this.items.filter((item) => item.referenceId.toString() === referenceId);
		return endereco;
	}
}