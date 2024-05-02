import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Usuario } from '@/domain/enterprise/entities/usuarios.entity';
import { UsuarioRepository } from '../../repositories/usuario-repository';

interface AlterStatusUsuarioUseCaseRequest{
    idUsuario: string
}
type AlterStatusUsuarioUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        usuario: Usuario
    }
>
export class AlterStatusUsuarioUseCase {
	constructor(
        private readonly usuarioRepository: UsuarioRepository
	){}

	async execute({
		idUsuario
	}: AlterStatusUsuarioUseCaseRequest): Promise<AlterStatusUsuarioUseCaseResponse> {
		const usuario = await this.usuarioRepository.findById(idUsuario);
		if (!usuario) {
			return left(new ResourceNotFoundError());
		}
		
		usuario.dataInativacao = usuario.dataInativacao ? null : new Date();
        
		await this.usuarioRepository.save(usuario);

		return right({usuario});
	}
}   