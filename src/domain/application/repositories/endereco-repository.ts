import { Endereco } from '@/domain/enterprise/entities/endereco.entity';

export abstract class EnderecoRepository {
    abstract create(data: Endereco): Promise<void>
    abstract save(data: Endereco): Promise<void>
    abstract delete(enderecoId: string): Promise<void>
    abstract findById(idEndereco: string): Promise<Endereco | null>
    abstract findByReferenceId(referenceId: string): Promise<Endereco[]>
}