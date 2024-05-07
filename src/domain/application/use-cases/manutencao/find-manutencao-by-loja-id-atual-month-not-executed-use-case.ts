import { Either, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindManutencaoByLojaidInAtualMonthNotExecutedUseCaseRequest {
    lojaId: string, 
    params: PaginationParams
}
type FindManutencaoByLojaidInAtualMonthNotExecutedUseCaseResponse = Either<null, 
{
    manutencoes: Manutencao[]
}>

export class FindManutencaoByLojaidInAtualMonthNotExecutedUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
	) {}

	async execute({lojaId, params}: FindManutencaoByLojaidInAtualMonthNotExecutedUseCaseRequest): Promise<FindManutencaoByLojaidInAtualMonthNotExecutedUseCaseResponse> {
		const manutencoes = await this.manutencaoRepository.findByLojaIdInAtualMonthNotExecuted(lojaId, params);
		
		return right({manutencoes});
	}

}