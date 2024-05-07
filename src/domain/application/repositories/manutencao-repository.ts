import { PaginationParams } from '@/core/repositories/pagination-params';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';

export abstract class ManutencaoRepository {
    abstract create(data: Manutencao): Promise<void>
    abstract findById(id: string): Promise<Manutencao | null>
    abstract findByLojaId(lojaId: string, params: PaginationParams): Promise<Manutencao[]>
    abstract findByLojaIdInAtualMonthNotExecuted(lojaId: string, params: PaginationParams): Promise<Manutencao[]>
    abstract findBycomponenteId(componenteId: string, params: PaginationParams): Promise<Manutencao[]>
    abstract findNearbyBycomponenteId(componenteId: string, params: PaginationParams): Promise<Manutencao[]>
    abstract findBycomponenteIdPeriod(componenteId: string, startDate: Date, endDate: Date,  params: PaginationParams): Promise<Manutencao[]>
    abstract findByNearbyMaquinaId(maquinaId: string, params: PaginationParams): Promise<Manutencao[]>
    abstract setManutencaoAsExecuted(manutencaoId: string, usuarioId: string): Promise<void>
    abstract findByMaquinaIdExecuted(maquinaId: string, params: PaginationParams): Promise<Manutencao[]>
    abstract findByRealizadaPor(realizadoPor: string, params: PaginationParams): Promise<Manutencao[]>
}