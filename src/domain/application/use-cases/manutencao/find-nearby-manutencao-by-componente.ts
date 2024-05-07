import { Either, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindNearbyManutencaoByComponenteUseCaseRequest {
    compontentId: string;
    params: PaginationParams
}
type FindNearbyManutencaoByComponenteUseCaseResponse = Either<null, 
{
    manutencoes: Manutencao[]
}>

export class FindNearbyManutencaoByComponenteUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
	) {}

	async execute({compontentId, params}: FindNearbyManutencaoByComponenteUseCaseRequest): Promise<FindNearbyManutencaoByComponenteUseCaseResponse> {
		const manutencoes = await this.manutencaoRepository.findNearbyByComponenteId(compontentId, params);
		return right({manutencoes});
	}

}