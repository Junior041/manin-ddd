//findByRealizadaPorUseCase

import { Either, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindByRealizadaPorUseCaseRequest {
    realizadoPor: string;
    params: PaginationParams
}
type FindByRealizadaPorUseCaseResponse = Either<null, 
{
    manutencoes: Manutencao[]
}>

export class FindByRealizadaPorUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
	) {}

	async execute({realizadoPor, params}: FindByRealizadaPorUseCaseRequest): Promise<FindByRealizadaPorUseCaseResponse> {
		const manutencoes = await this.manutencaoRepository.findByRealizadaPor(realizadoPor, params);
		return right({manutencoes});
	}

}