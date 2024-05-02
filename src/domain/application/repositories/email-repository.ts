import { Email } from '@/domain/enterprise/entities/email.entity';

export abstract class EmailRepository {
    abstract create(data: Email): Promise<void>
    abstract save(data: Email): Promise<void>
    abstract delete(emailId: string): Promise<void>
    abstract findById(idEmail: string): Promise<Email | null>
    abstract findByLojaId(lojaId: string): Promise<Email[]>
}