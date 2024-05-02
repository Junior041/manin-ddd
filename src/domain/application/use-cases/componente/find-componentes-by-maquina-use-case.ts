import { Either, right } from '@/core/either';
import { ComponenteRepository } from '../../repositories/componente-repository';
import { Componente } from '@/domain/enterprise/entities/componente.entity';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindComponentesByMaquinaUseCaseRequest {
  maquinaId: string;
  params: PaginationParams
}

type FindComponentesByMaquinaUseCaseResponse = Either<
null,
{
    componentes: Componente[]
}
>

export class FindComponentesByMaquinaUseCase {
	constructor(
        private readonly componenteRepository: ComponenteRepository,
	) {}

	async execute({ maquinaId,params }: FindComponentesByMaquinaUseCaseRequest): Promise<FindComponentesByMaquinaUseCaseResponse> {
		const componentes = await this.componenteRepository.findByMaquinaId(maquinaId, { page: params.page });
        
		return right({componentes});
	}
}
