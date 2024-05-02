import { Either, left, right } from '@/core/either';
import { MaquinaRepository } from '../../repositories/maquina-repository';
import { Maquina } from '@/domain/enterprise/entities/maquina.entity';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface UpdateMaquinaUseCaseRequest {
  maquinaId: string;
  nome: string;
  marca: string;
  descricao?: string | null;
  dataAquisição?: Date | null;
}

type UpdateMaquinaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    maquina: Maquina;
  }
>;

export class UpdateMaquinaUseCase {
	constructor(private readonly maquinaRepository: MaquinaRepository) {}

	async execute({maquinaId, marca, nome, dataAquisição, descricao }: UpdateMaquinaUseCaseRequest): Promise<UpdateMaquinaUseCaseResponse> {
		const maquina = await this.maquinaRepository.findById(maquinaId);
		if (!maquina) {
			return left(new ResourceNotFoundError());
		}
		maquina.nome = nome;
		maquina.marca = marca;
		maquina.descricao = descricao;
		maquina.dataAquisição = dataAquisição;

		await this.maquinaRepository.save(maquina);

		return right({ maquina });
	}
}
