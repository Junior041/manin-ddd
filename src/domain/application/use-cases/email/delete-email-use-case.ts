import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EmailRepository } from '@/domain/application/repositories/email-repository';

interface DeleteEmailUseCaseRequest {
  emailId: string;
}

type DeleteEmailUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>;

export class DeleteEmailUseCase {
	constructor(private readonly emailRepository: EmailRepository) {}

	async execute({ emailId }: DeleteEmailUseCaseRequest): Promise<DeleteEmailUseCaseResponse> {
		const emailInDatabase = await this.emailRepository.findById(emailId);
		if (!emailInDatabase) {
			return left(new ResourceNotFoundError());
		}

		await this.emailRepository.delete(emailInDatabase.id.toString());

		return right(null);		

	}
}
