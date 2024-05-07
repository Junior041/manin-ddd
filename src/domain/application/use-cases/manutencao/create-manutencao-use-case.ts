import { Either, left, right } from '@/core/either';
import { Manutencao } from '@/domain/enterprise/entities/manutencao-entity';
import { ManutencaoRepository } from '../../repositories/manutencao-repository';
import { LojaRepository } from '../../repositories/loja-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ComponenteRepository } from '../../repositories/componente-repository';
import { UsuarioRepository } from '../../repositories/usuario-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface CreateManutencaoUseCaseRequest {
    compontentId: string;
    lojaId: string;
    urgencia: 1 | 2 | 3;
    dataManutencao: Date;
    dataRealizacao?: Date | null;
    realizadaPor?: string | null;
    tipoManutencao: 'PREVENTIVA' | 'CORRETIVA' | 'EMERGENCIAL' | 'PREDITIVA';   
}
type CreateManutencaoUseCaseResponse = Either<ResourceNotFoundError, 
{
    manutencao: Manutencao
}>

export class CreateManutencaoUseCase {

	constructor(
        private readonly manutencaoRepository: ManutencaoRepository,
        private readonly lojaRepository: LojaRepository,
        private readonly componenteRepository: ComponenteRepository,
        private readonly usuarioRepository: UsuarioRepository,
	) {}

	async execute({compontentId,dataManutencao,lojaId,tipoManutencao,urgencia,dataRealizacao,realizadaPor}: CreateManutencaoUseCaseRequest): Promise<CreateManutencaoUseCaseResponse> {
		const [lojaAlreadyExists, componenteAlreadyExists] = await Promise.all([
			this.lojaRepository.findById(lojaId),
			this.componenteRepository.findById(compontentId),
		]);
		if (!lojaAlreadyExists || !componenteAlreadyExists) {
			return left(new ResourceNotFoundError());
		}
		if (realizadaPor) {
			const usuarioAlreadyExists = await this.usuarioRepository.findById(realizadaPor);
			if (!usuarioAlreadyExists) {
				return left(new ResourceNotFoundError());
			}
		}
		const manutencao = Manutencao.create({
			compontentId: new UniqueEntityID(compontentId),
			dataManutencao,
			lojaId: new UniqueEntityID(lojaId),
			tipoManutencao,
			urgencia,
			dataRealizacao,
			realizadaPor: realizadaPor ? new UniqueEntityID(realizadaPor) : null,
		});

		await this.manutencaoRepository.create(manutencao);
		return right({manutencao});
	}

}