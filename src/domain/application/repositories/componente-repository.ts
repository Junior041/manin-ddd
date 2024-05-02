import { PaginationParams } from '@/core/repositories/pagination-params';
import { Componente } from '@/domain/enterprise/entities/componente.entity';

export abstract class ComponenteRepository {
    abstract create(data: Componente): Promise<void>
    abstract save(data: Componente): Promise<void>
    abstract findById(Id: string): Promise<Componente | null>
    abstract findByMaquinaId(maquinaId: string, params: PaginationParams): Promise<Componente[]>
    abstract findAllByMaquinaId(maquinaId: string): Promise<Componente[]>
}