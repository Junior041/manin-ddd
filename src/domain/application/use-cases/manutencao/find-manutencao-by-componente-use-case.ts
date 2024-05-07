import { Either, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindManutencaoByComponenteUseCaseRequest {
    componenteId: string, 
    params: PaginationParams
}
type FindManutencaoByComponenteUseCaseResponse = Either<null, 
{
    manutencoes: Manutencao[]
}>

export class FindManutencaoByComponenteUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
	) {}

	async execute({componenteId, params}: FindManutencaoByComponenteUseCaseRequest): Promise<FindManutencaoByComponenteUseCaseResponse> {
		const manutencoes = await this.manutencaoRepository.findBycomponenteId(componenteId, params);
		
		return right({manutencoes});
	}

}