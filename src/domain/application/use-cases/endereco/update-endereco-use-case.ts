import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Endereco } from '@/domain/enterprise/entities/endereco.entity';
import { EnderecoRepository } from '@/domain/application/repositories/endereco-repository';

interface UpdateEnderecoUseCaseRequest {
  enderecoId: string;
  bairro: string;
  complemeto?: string;
  endereco: string;
  numero: string;
  cep: string;
  estado: string;
  cidade: string;

  principal?: boolean;
  longitude: number;
  latitude: number;
}

type UpdateEnderecoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    endereco: Endereco;
  }
>;

export class UpdateEnderecoUseCase {
	constructor(private readonly enderecoRepository: EnderecoRepository) {}

	async execute({ bairro, cep, cidade, endereco, estado, latitude, enderecoId, longitude, numero, principal, complemeto }: UpdateEnderecoUseCaseRequest): Promise<UpdateEnderecoUseCaseResponse> {
		const enderecoInDatabase = await this.enderecoRepository.findById(enderecoId);
		if (!enderecoInDatabase) {
			return left(new ResourceNotFoundError());
		}
		const cnpjOnlyNumbers = cep.replace(/\D/g, '');

		enderecoInDatabase.bairro = bairro;
		enderecoInDatabase.cep = cnpjOnlyNumbers;
		enderecoInDatabase.cidade = cidade;
		enderecoInDatabase.endereco = endereco;
		enderecoInDatabase.estado = estado;
		enderecoInDatabase.latitude = latitude;
		enderecoInDatabase.longitude = longitude;
		enderecoInDatabase.numero = numero;
		enderecoInDatabase.principal = principal || enderecoInDatabase.principal;
		enderecoInDatabase.complemeto = complemeto;

		await this.enderecoRepository.save(enderecoInDatabase);

		return right({ endereco: enderecoInDatabase });
	}
}
