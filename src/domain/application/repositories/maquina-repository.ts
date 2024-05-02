import { PaginationParams } from '@/core/repositories/pagination-params';
import { Maquina } from '@/domain/enterprise/entities/maquina.entity';

export abstract class MaquinaRepository {
    abstract create(data: Maquina): Promise<void>
    abstract save(data: Maquina): Promise<void>
    abstract findById(Id: string): Promise<Maquina | null>
    abstract findByLojaId(lojaId: string, params: PaginationParams): Promise<Maquina[]>
}