import { Either, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';

interface FindManutencaoByIdUseCaseRequest {
    manutencaoId: string, 
}
type FindManutencaoByIdUseCaseResponse = Either<null, 
{
    manutencao: Manutencao | null
}>

export class FindManutencaoByIdUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
	) {}

	async execute({manutencaoId}: FindManutencaoByIdUseCaseRequest): Promise<FindManutencaoByIdUseCaseResponse> {
		const manutencao = await this.manutencaoRepository.findById(manutencaoId);
		
		return right({manutencao: manutencao || null});
	}

}