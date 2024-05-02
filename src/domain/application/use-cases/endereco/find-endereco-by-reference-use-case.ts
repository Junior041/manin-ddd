import { Either, right } from '@/core/either';
import { Endereco } from '@/domain/enterprise/entities/endereco.entity';
import { EnderecoRepository } from '@/domain/application/repositories/endereco-repository';

interface FindEnderecoByReferenceIdUseCaseRequest {
  referenceId: string;
}

type FindEnderecoByReferenceIdUseCaseResponse = Either<
    null,
  {
    enderecos: Endereco[];
  }
>;

export class FindEnderecoByReferenceIdUseCase {
	constructor(private readonly enderecoRepository: EnderecoRepository) {}
	async execute({ referenceId }: FindEnderecoByReferenceIdUseCaseRequest): Promise<FindEnderecoByReferenceIdUseCaseResponse> {
		const enderecos = await this.enderecoRepository.findByReferenceId(referenceId);
		return right({ enderecos });
	}
}
