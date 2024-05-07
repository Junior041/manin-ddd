import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Manutencao, ManutencaoProps } from '@/domain/enterprise/entities/manutencao-entity';

export function makeEndereco(
	override: Partial<ManutencaoProps> = {},
	id?: UniqueEntityID,
) {
	const manutencao = Manutencao.create(
		{
			compontentId: override.compontentId ?? new UniqueEntityID(),
			dataManutencao: override.dataManutencao ?? new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
			dataRealizacao: override.dataRealizacao ?? null,
			lojaId: override.lojaId ?? new UniqueEntityID(),
			realizadaPor: override.realizadaPor ?? null,
			tipoManutencao: override.tipoManutencao ?? 'PREVENTIVA',
			urgencia: override.urgencia ?? 1,
			...override,
		},
		id,
	);

	return manutencao;
}