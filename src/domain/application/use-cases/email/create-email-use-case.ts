import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Email } from '@/domain/enterprise/entities/email.entity';
import { EmailRepository } from '@/domain/application/repositories/email-repository';
import { LojaRepository } from '@/domain/application/repositories/loja-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ReferenceType } from '@/core/types/reference-type';

interface CreateEmailUseCaseRequest {
	referenceId: string
	referenceType: ReferenceType
	email: string
	nome: string
	principal: boolean
	publico: boolean
}

type CreateEmailUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    email: Email;
  }
>;

export class CreateEmailUseCase {
	constructor(
        private readonly emailRepository: EmailRepository,
        private readonly lojaRepository: LojaRepository,
	) {}

	async execute({ referenceType,email,referenceId,nome,principal,publico }: CreateEmailUseCaseRequest): Promise<CreateEmailUseCaseResponse> {
		const lojaExists = await this.lojaRepository.findById(referenceId);
		if (!lojaExists) {
			return left(new ResourceNotFoundError());
		}
		const emailEntity = Email.create({
			email,
			referenceType,
			referenceId: new UniqueEntityID(referenceId),
			nome,
			principal,
			publico,
		});
		await this.emailRepository.create(emailEntity);

		return right({ email: emailEntity });
	}
}
