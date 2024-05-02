import { Either, right } from '@/core/either';
import { MaquinaRepository } from '../../repositories/maquina-repository';
import { Maquina } from '@/domain/enterprise/entities/maquina.entity';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindMaquinasByLojaUseCaseRequest {
  lojaId: string;
  params: PaginationParams
}

type FindMaquinasByLojaUseCaseResponse = Either<
null,
{
    maquinas: Maquina[]
}
>

export class FindMaquinasByLojaUseCase {
	constructor(
        private readonly maquinaRepository: MaquinaRepository,
	) {}

	async execute({ lojaId,params }: FindMaquinasByLojaUseCaseRequest): Promise<FindMaquinasByLojaUseCaseResponse> {
		const maquinas = await this.maquinaRepository.findByLojaId(lojaId, { page: params.page });
        
		return right({maquinas});
	}
}
