import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Loja } from '@/domain/enterprise/entities/loja.entity';
import { LojaRepository } from '@/domain/application/repositories/loja-repository';
import { LojaAlreadyExists } from '../_erros/loja-already-exists-error';

interface CreateLojaUseCaseRequest {
  razaoSocial: string;
  cnpj: string;
  ativo: boolean;
}

type CreateLojaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    loja: Loja;
  }
>;

export class CreateLojaUseCase {
	constructor(private readonly lojaRepository: LojaRepository) {}

	async execute({ cnpj, razaoSocial, ativo }: CreateLojaUseCaseRequest): Promise<CreateLojaUseCaseResponse> {
		const cnpjOnlyNumbers = cnpj.replace(/\D/g, '');

		const lojaAlreadyExists = await this.lojaRepository.findByCnpj(cnpjOnlyNumbers);
		if (lojaAlreadyExists) {
			return left(new LojaAlreadyExists());
		}

		const loja = Loja.create({ cnpj, razaoSocial, ativo });
		await this.lojaRepository.create(loja);

		return right({ loja });
	}
}
