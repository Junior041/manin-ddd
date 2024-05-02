import { Either, left, right } from '@/core/either';
import { UsuarioRepository } from '../../repositories/usuario-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Usuario } from '@/domain/enterprise/entities/usuarios.entity';

interface UpdateUsuarioUseCaseRequest {
    idUsuario: string
    nome: string
    cargo: 'GERENTE'|'DIRETOR'|'MECANICO'
}

type UpdateUsuarioUseCaseResponse = Either<
ResourceNotFoundError,
{
    usuario: Usuario
}
>

export class UpdateUsuarioUseCase {
	constructor(
        private readonly usuarioRepository: UsuarioRepository
	){}

	async execeute({
		idUsuario,
		nome,
		cargo
	}: UpdateUsuarioUseCaseRequest): Promise<UpdateUsuarioUseCaseResponse> {
		const usuario = await this.usuarioRepository.findById(idUsuario);
		if (!usuario) {
			return left(new ResourceNotFoundError());
		}
		usuario.nome = nome;
		usuario.cargo = cargo;
        
		await this.usuarioRepository.save(usuario);

		return right({usuario});
	}
}