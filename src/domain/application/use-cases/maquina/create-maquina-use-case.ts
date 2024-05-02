import { Either, left, right } from '@/core/either';
import { MaquinaRepository } from '../../repositories/maquina-repository';
import { Maquina } from '@/domain/enterprise/entities/maquina.entity';
import { LojaRepository } from '../../repositories/loja-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface CreateMaquinaUseCaseRequest {
  nome: string;
  lojaId: string;
  marca: string;
  descricao?: string | null;
  codigo?: string | null;
  dataAquisição?: Date | null;
}

type CreateMaquinaUseCaseResponse = Either<
ResourceNotFoundError,
{
    maquina: Maquina
}
>

export class CreateMaquinaUseCase {
	constructor(
        private readonly maquinaRepository: MaquinaRepository,
        private readonly lojaRepository: LojaRepository,
        
	) {}

	async execute({lojaId,marca,nome,codigo,dataAquisição,descricao,
	}: CreateMaquinaUseCaseRequest): Promise<CreateMaquinaUseCaseResponse> {
		const loja = await this.lojaRepository.findById(lojaId);
		if (!loja) {
			return left(new ResourceNotFoundError());
		}
		const maquina = Maquina.create({
			dataInativacao: null,
			lojaId: loja.id,
			marca,
			nome,
			codigo,
			dataAquisição,
			descricao,
		});

		await this.maquinaRepository.create(maquina);

		return right({ maquina });
	}
}
