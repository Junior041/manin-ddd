import { Either, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindManutencaoByMaquinaExecutedUseCaseRequest {
    maquinaId: string;
    params: PaginationParams
}
type FindManutencaoByMaquinaExecutedUseCaseResponse = Either<null, 
{
    manutencoes: Manutencao[]
}>

export class FindManutencaoByMaquinaExecutedUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
	) {}

	async execute({maquinaId, params}: FindManutencaoByMaquinaExecutedUseCaseRequest): Promise<FindManutencaoByMaquinaExecutedUseCaseResponse> {
		const manutencoes = await this.manutencaoRepository.findByMaquinaIdExecuted(maquinaId, params);
		return right({manutencoes});
	}

}