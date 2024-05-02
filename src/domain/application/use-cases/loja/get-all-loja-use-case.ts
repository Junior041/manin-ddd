import { Either, right } from '@/core/either';
import { Loja } from '@/domain/enterprise/entities/loja.entity';
import { LojaRepository } from '@/domain/application/repositories/loja-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface GetAllLojaUseCaseRequest {
  params: PaginationParams;
}

type GetAllLojaUseCaseResponse = Either<
  null,
  {
    lojas: Loja[];
  }
>;

export class GetAllLojaUseCase {
	constructor(private readonly lojaRepository: LojaRepository) {}

	async execute({ params }: GetAllLojaUseCaseRequest): Promise<GetAllLojaUseCaseResponse> {
		const lojas = await this.lojaRepository.getAll(params);
		return right({ lojas: lojas });
	}
}
