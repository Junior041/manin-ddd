import { Either, left, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { UsuarioRepository } from '../../repositories/usuario-repository';

interface SetManutencaoAsExecutedUseCaseRequest {
    manutencaoId: string,
    usuarioId: string
}
type SetManutencaoAsExecutedUseCaseResponse = Either<ResourceNotFoundError, 
{
    manutencao: Manutencao
}>

export class SetManutencaoAsExecutedUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
        private readonly usuarioRepository: UsuarioRepository,
	) {}

	async execute({manutencaoId,usuarioId}: SetManutencaoAsExecutedUseCaseRequest): Promise<SetManutencaoAsExecutedUseCaseResponse> {
		const manutencao = await this.manutencaoRepository.findById(manutencaoId);
		const usuario = await this.usuarioRepository.findById(usuarioId);
		if(!manutencao || !usuario){
			return left(new ResourceNotFoundError());
		}
		await this.manutencaoRepository.setManutencaoAsExecuted(manutencao.id.toString(),usuario.id.toString());

		return right({manutencao});
	}

}