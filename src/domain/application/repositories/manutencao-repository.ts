import { PaginationParams } from '@/core/repositories/pagination-params';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';

export abstract class ManutencaoRepository {
    abstract create(data: Manutencao): Promise<void>
    abstract findById(id: string): Promise<Manutencao | null>
    abstract findByComponenteId(componenteId: string, params: PaginationParams): Promise<Manutencao[]>
    abstract findNearbyByComponenteId(componenteId: string, params: PaginationParams): Promise<Manutencao[]>
    abstract findByComponenteIdPeriod(componenteId: string, startDate: Date, endDate: Date,  params: PaginationParams): Promise<Manutencao[]>
    abstract findByNearbyMaquinaId(maquinaId: string, params: PaginationParams): Promise<Manutencao[]>
    abstract setManutencaoAsExecuted(manutencaoId: string, usuarioId: string): Promise<void>
    abstract findByMaquinaIdExecuted(maquinaId: string, params: PaginationParams): Promise<Manutencao[]>
    abstract findByRealizadaPor(realizadoPor: string, params: PaginationParams): Promise<Manutencao[]>
}