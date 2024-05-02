import { Either, left, right } from '@/core/either';
import { UsuarioRepository } from '../../repositories/usuario-repository';
import { Usuario } from '@/domain/enterprise/entities/usuarios.entity';
import { HashGenerator } from '../../cryptography/hashGenerator';
import { LojaRepository } from '../../repositories/loja-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface CreateUsuarioUseCaseRequest{
    nome: string
    email: string
    cpf: string
    senha: string
    lojaId: string
    cargo: 'GERENTE'|'DIRETOR'|'MECANICO'
}

type CreateUsuarioUseCaseResponse = Either<
ResourceNotFoundError,
{
    usuario: Usuario
}>;

export class CreateUsuarioUseCase{
	constructor(
        private readonly usuarioRepository: UsuarioRepository,
        private readonly lojaRepository: LojaRepository,
        private readonly hashGenerator: HashGenerator
	){}

	async execute({ lojaId, cargo, cpf, email, nome, senha }: CreateUsuarioUseCaseRequest): Promise<CreateUsuarioUseCaseResponse>{
        
		const loja = await this.lojaRepository.findById(lojaId);

		if (!loja) {
			return left(new ResourceNotFoundError());
		}

		const senha_hash = await this.hashGenerator.hash(senha);
		const usuario = Usuario.create({
			nome,
			email,
			cpf,
			senha_hash,
			lojaId: new UniqueEntityID(lojaId),
			cargo,
			dataInativacao: null,
		});
		await this.usuarioRepository.create(usuario);
		return right({usuario});
	}
    
}