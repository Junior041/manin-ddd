import { Either, left, right } from '@/core/either';
import { ComponenteRepository } from '../../repositories/componente-repository';
import { Componente } from '@/domain/enterprise/entities/componente.entity';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { MaquinaRepository } from '../../repositories/maquina-repository';

interface CreateComponenteUseCaseRequest {
    maquinaId: string
	nome: string;
    descricao: string;
    valorUnitario: 'UNIDADE'|'LITROS'|'METROS';
    identificador: string | null;
    valor: number;
}

type CreateComponenteUseCaseResponse = Either<
ResourceNotFoundError,
{
    componente: Componente
}
>

export class CreateComponenteUseCase {
	constructor(
        private readonly componenteRepository: ComponenteRepository,
        private readonly maquinaRepository: MaquinaRepository,
        
	) {}

	async execute({ descricao,identificador,maquinaId,nome,valor,valorUnitario	}: CreateComponenteUseCaseRequest): Promise<CreateComponenteUseCaseResponse> {
		const maquina = await this.maquinaRepository.findById(maquinaId);
		if (!maquina) {
			return left(new ResourceNotFoundError());
		}
		const componente = Componente.create({
			descricao,
			identificador,
			maquinaId: maquina.id,
			nome,
			valor,
			valorUnitario
		});

		await this.componenteRepository.create(componente);

		return right({ componente });
	}
}
