//FindManutencaoByRealizadaPorUseCase

import { Either, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindManutencaoByRealizadaPorUseCaseRequest {
    realizadoPor: string;
    params: PaginationParams
}
type FindManutencaoByRealizadaPorUseCaseResponse = Either<null, 
{
    manutencoes: Manutencao[]
}>

export class FindManutencaoByRealizadaPorUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
	) {}

	async execute({realizadoPor, params}: FindManutencaoByRealizadaPorUseCaseRequest): Promise<FindManutencaoByRealizadaPorUseCaseResponse> {
		const manutencoes = await this.manutencaoRepository.findByRealizadaPor(realizadoPor, params);
		return right({manutencoes});
	}

}