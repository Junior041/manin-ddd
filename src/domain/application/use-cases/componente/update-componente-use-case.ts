import { Either, left, right } from '@/core/either';
import { ComponenteRepository } from '../../repositories/componente-repository';
import { Componente } from '@/domain/enterprise/entities/componente.entity';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface UpdateComponenteUseCaseRequest {
	componenteId: string;
	nome: string;
    descricao: string;
    valorUnitario: 'UNIDADE'|'LITROS'|'METROS';
    identificador: string | null;
    valor: number;
}

type UpdateComponenteUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    componente: Componente;
  }
>;

export class UpdateComponenteUseCase {
	constructor(private readonly componenteRepository: ComponenteRepository) {}

	async execute({ componenteId, descricao,identificador,nome,valor,valorUnitario }: UpdateComponenteUseCaseRequest):Promise<UpdateComponenteUseCaseResponse> {
		const componente = await this.componenteRepository.findById(componenteId);
		if (!componente) {
			return left(new ResourceNotFoundError());
		}
		
		componente.nome = nome;
		componente.descricao = descricao;
		componente.valorUnitario = valorUnitario;
		componente.identificador = identificador;
		componente.valor = valor;

		await this.componenteRepository.save(componente);

		return right({ componente });
	}
}
