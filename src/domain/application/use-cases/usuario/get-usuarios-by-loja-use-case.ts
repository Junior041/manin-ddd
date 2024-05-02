import { Usuario } from '@/domain/enterprise/entities/usuarios.entity';
import { UsuarioRepository } from '../../repositories/usuario-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Either, right } from '@/core/either';

interface GetUsuariosByLojaUseCaseRequest {
    lojaId: string
    params: PaginationParams
}
type GetUsuariosByLojaUseCaseResponse = Either<
  null,
  {
    usuarios: Usuario[]

  }
>;



export class GetUsuariosByLojaUseCase {
	constructor(private readonly usuarioRepository: UsuarioRepository) {}

	async execute({lojaId,params}: GetUsuariosByLojaUseCaseRequest): Promise<GetUsuariosByLojaUseCaseResponse> {
		const usuarios = await this.usuarioRepository.findByLojaId(lojaId, { page: params.page });
		return right({usuarios});
	}
}