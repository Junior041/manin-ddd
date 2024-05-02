import { Either, right } from '@/core/either';
import { Email } from '@/domain/enterprise/entities/email.entity';
import { EmailRepository } from '@/domain/application/repositories/email-repository';

interface FindEmailByReferenceIdUseCaseRequest {
  referenceId: string;
}

type FindEmailByReferenceIdUseCaseResponse = Either<
    null,
  {
    emails: Email[];
  }
>;

export class FindEmailByReferenceIdUseCase {
	constructor(private readonly emailRepository: EmailRepository) {}
	async execute({ referenceId }: FindEmailByReferenceIdUseCaseRequest): Promise<FindEmailByReferenceIdUseCaseResponse> {
		const emails = await this.emailRepository.findByLojaId(referenceId);
		return right({ emails });
	}
}
