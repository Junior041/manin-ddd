import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Loja } from '@/domain/enterprise/entities/loja.entity';
import { LojaRepository } from '@/domain/application/repositories/loja-repository';

interface UpdateLojaUseCaseRequest {
  lojaId: string;
  razaoSocial: string;
  ativo: boolean;
}

type UpdateLojaUseCaseResponse = Either<
ResourceNotFoundError,
  {
    loja: Loja;
  }
>;

export class UpdateLojaUseCase {
	constructor(private readonly lojaRepository: LojaRepository) {}

	async execute({ lojaId, razaoSocial, ativo }: UpdateLojaUseCaseRequest): Promise<UpdateLojaUseCaseResponse> {
		const loja = await this.lojaRepository.findById(lojaId);
		if (!loja) {
			return left(new ResourceNotFoundError());
		}

		loja.razaoSocial = razaoSocial, 
		loja.ativo = ativo;
		
		await this.lojaRepository.save(loja);

		return right({ loja });
	}
}
