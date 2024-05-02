import { Email } from '@/domain/enterprise/entities/email.entity';
import { EmailRepository } from '@/domain/application/repositories/email-repository';

export class InMemoryEmailRepository extends EmailRepository {
	public items: Email[] = [];

	async create(data: Email): Promise<void> {
		this.items.push(data);
	}

	async delete(emailId: string): Promise<void> {
		this.items = this.items.filter((item) => item.id.toString() !== emailId);
	}

	async save(data: Email): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === data.id);
		this.items[itemIndex] = data;
	}

	async findById(idEmail: string): Promise<Email | null> {
		const email = this.items.find((item) => item.id.toString() === idEmail);
		if (!email) {
			return null;
		}
		return email;
	}

	async findByLojaId(referenceId: string): Promise<Email[]> {
		const email = this.items.filter((item) => item.referenceId.toString() === referenceId);
		return email;
	}
}