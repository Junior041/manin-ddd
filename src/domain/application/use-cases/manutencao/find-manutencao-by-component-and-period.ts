import { Either, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindManutencaoByComponenteAndPeriodoUseCaseRequest {
    componenteId: string, 
    startDate: Date | null, 
    endDate: Date
    params: PaginationParams
}
type FindManutencaoByComponenteAndPeriodoUseCaseResponse = Either<null, 
{
    manutencoes: Manutencao[]
}>

export class FindManutencaoByComponenteAndPeriodoUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
	) {}

	async execute({componenteId, endDate, startDate, params}: FindManutencaoByComponenteAndPeriodoUseCaseRequest): Promise<FindManutencaoByComponenteAndPeriodoUseCaseResponse> {
		startDate = startDate || new Date();
		const manutencoes = await this.manutencaoRepository.findBycomponenteIdPeriod(componenteId, startDate, endDate, params);
		
		return right({manutencoes});
	}

}