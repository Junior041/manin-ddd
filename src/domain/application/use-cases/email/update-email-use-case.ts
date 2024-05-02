import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Email } from '@/domain/enterprise/entities/email.entity';
import { EmailRepository } from '@/domain/application/repositories/email-repository';

interface UpdateEmailUseCaseRequest {
  emailId: string;
  email: string
  nome: string
  principal: boolean
  publico: boolean
}

type UpdateEmailUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    email: Email;
  }
>;

export class UpdateEmailUseCase {
	constructor(private readonly emailRepository: EmailRepository) {}

	async execute({ email,emailId,nome,principal,publico }: UpdateEmailUseCaseRequest): Promise<UpdateEmailUseCaseResponse> {
		const emailInDatabase = await this.emailRepository.findById(emailId);
		if (!emailInDatabase) {
			return left(new ResourceNotFoundError());
		}
		emailInDatabase.email = email;
		emailInDatabase.nome = nome;
		emailInDatabase.principal = principal;
		emailInDatabase.publico = publico;

		await this.emailRepository.save(emailInDatabase);

		return right({ email: emailInDatabase });
	}
}
