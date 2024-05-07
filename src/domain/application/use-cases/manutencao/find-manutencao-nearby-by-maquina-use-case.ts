import { Either, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindManutencaoNearbyByMaquinaUseCaseRequest {
    maquinaId: string;
    params: PaginationParams
}
type FindManutencaoNearbyByMaquinaUseCaseResponse = Either<null, 
{
    manutencoes: Manutencao[]
}>

export class FindManutencaoNearbyByMaquinaUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
	) {}

	async execute({maquinaId, params}: FindManutencaoNearbyByMaquinaUseCaseRequest): Promise<FindManutencaoNearbyByMaquinaUseCaseResponse> {
		const manutencoes = await this.manutencaoRepository.findByNearbyMaquinaId(maquinaId, params);
		return right({manutencoes});
	}

}