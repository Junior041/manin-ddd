import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EnderecoRepository } from '@/domain/application/repositories/endereco-repository';

interface DeleteEnderecoUseCaseRequest {
  enderecoId: string;
}

type DeleteEnderecoUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>;

export class DeleteEnderecoUseCase {
	constructor(private readonly enderecoRepository: EnderecoRepository) {}

	async execute({ enderecoId }: DeleteEnderecoUseCaseRequest): Promise<DeleteEnderecoUseCaseResponse> {
		const enderecoInDatabase = await this.enderecoRepository.findById(enderecoId);
		if (!enderecoInDatabase) {
			return left(new ResourceNotFoundError());
		}

		await this.enderecoRepository.delete(enderecoInDatabase.id.toString());

		return right(null);		

	}
}
