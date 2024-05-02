import { Either, right } from '@/core/either';
import { Endereco } from '@/domain/enterprise/entities/endereco.entity';
import { EnderecoRepository } from '@/domain/application/repositories/endereco-repository';
import { LojaRepository } from '@/domain/application/repositories/loja-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface CreateEnderecoUseCaseRequest {
	referenceId: string;
  bairro: string;
  complemeto?: string;
  endereco: string;
  numero: string;
  cep: string;
  estado: string
  cidade: string;

  principal?: boolean;
  longitude: number;
  latitude: number;

}

type CreateEnderecoUseCaseResponse = Either<
  null,
  {
    endereco: Endereco;
  }
>;

export class CreateEnderecoUseCase {
	constructor(
        private readonly enderecoRepository: EnderecoRepository,
        private readonly lojaRepository: LojaRepository,
	) {}

	async execute({ bairro,cep,cidade,endereco,estado,latitude,referenceId,longitude,numero,principal,complemeto }: CreateEnderecoUseCaseRequest): Promise<CreateEnderecoUseCaseResponse> {
        
		const cnpjOnlyNumbers = cep.replace(/\D/g, '');

		const enderecoEntity = Endereco.create({
			referenceId: new UniqueEntityID(referenceId),
			bairro,
			cep: cnpjOnlyNumbers,
			cidade,
			endereco,
			estado,
			latitude,
			longitude,
			numero,
			principal: principal || false,
			complemeto 
		});
		await this.enderecoRepository.create(enderecoEntity);

		return right({ endereco: enderecoEntity });
	}
}
