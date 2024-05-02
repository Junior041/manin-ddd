import { PaginationParams } from '@/core/repositories/pagination-params';
import { UsuarioRepository } from '@/domain/application/repositories/usuario-repository';
import { Usuario } from '@/domain/enterprise/entities/usuarios.entity';

export class InMemoryUsuarioRepository extends UsuarioRepository {
	public items: Usuario[] = [];

	async create(data: Usuario): Promise<void> {
		this.items.push(data);
	}

	async save(data: Usuario) {
		const itemIndex = this.items.findIndex((item) => item.id === data.id);
		this.items[itemIndex] = data;
	}


	async findByLojaId(lojaId: string, { page }: PaginationParams): Promise<Usuario[]> {
		const usuario = this.items.filter((item) => item.lojaId.toString() === lojaId)
			.slice((page - 1) * 20, page * 20);
		
		return usuario;	
	}

	async findByEmail(email: string): Promise<Usuario | null> {
		const usuario = this.items.find((item) => item.email === email);
		return usuario || null;	
	}

	async findById(idUsuario: string): Promise<Usuario | null> {
		const usuario = this.items.find((item) => item.id.toString() === idUsuario);
		return usuario || null;	
	}
	
}