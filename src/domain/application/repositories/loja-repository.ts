import { PaginationParams } from '@/core/repositories/pagination-params';
import { Loja } from '@/domain/enterprise/entities/loja.entity';

export abstract class LojaRepository {
    abstract create(data: Loja): Promise<void>
    abstract save(data: Loja): Promise<void>
    abstract getAll({ page }: PaginationParams): Promise<Loja[]>
    abstract findById(lojaId: string): Promise<Loja | null>
    abstract findByCnpj(cnpj: string): Promise<Loja | null>
    abstract alterStatusLoja(lojaId: string): Promise<void>
}