import { PaginationParams } from '@/core/repositories/pagination-params';
import { Usuario } from '@/domain/enterprise/entities/usuarios.entity';

export abstract class UsuarioRepository {   
	abstract create(data: Usuario): Promise<void>
	abstract save(data: Usuario): Promise<void>
	abstract findByLojaId(lojaId: string, {page}: PaginationParams): Promise<Usuario[]>
	abstract findById(idUsuario: string): Promise<Usuario | null>
	abstract findByEmail(email: string): Promise<Usuario | null>
}