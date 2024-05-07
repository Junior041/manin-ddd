import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Manutencao, ManutencaoProps } from '@/domain/enterprise/entities/manutencao-entity';

export function makeManutencao(
	override: Partial<ManutencaoProps> = {},
	id?: UniqueEntityID,
) {
	const manutencao = Manutencao.create(
		{
			componenteId: override.componenteId ?? new UniqueEntityID(),
			dataManutencao: override.dataManutencao ?? new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
			dataRealizacao: override.dataRealizacao ?? null,
			lojaId: override.lojaId ?? new UniqueEntityID(),
			realizadaPor: override.realizadaPor ?? null,
			tipoManutencao: override.tipoManutencao ?? 'PREVENTIVA',
			createdAt: override.createdAt ?? new Date(),
			urgencia: override.urgencia ?? 1,
			...override,
		},
		id,
	);

	return manutencao;
}