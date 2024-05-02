import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Loja } from '@/domain/enterprise/entities/loja.entity';
import { LojaRepository } from '@/domain/application/repositories/loja-repository';

interface AlterStatusUseCaseRequest {
  lojaId: string;
}

type AlterStatusUseCaseResponse = Either<
ResourceNotFoundError,
  {
    loja: Loja;
  }
>;

export class AlterStatusUseCase {
	constructor(private readonly lojaRepository: LojaRepository) {}

	async execute({ lojaId }: AlterStatusUseCaseRequest): Promise<AlterStatusUseCaseResponse> {
		const loja = await this.lojaRepository.findById(lojaId);
		if (!loja) {
			return left(new ResourceNotFoundError());
		}
		await this.lojaRepository.alterStatusLoja(lojaId);
		return right({ loja });
	}
}
