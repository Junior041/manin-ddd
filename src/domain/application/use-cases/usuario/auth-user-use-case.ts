import { Either, left, right } from '@/core/either';
import { HashComparer } from '../../cryptography/hashComparer';
import { UsuarioRepository } from '../../repositories/usuario-repository';
import { WrongCredentialsError } from '../_erros/wrong-credentials-error';
import { Encrypter } from '../../cryptography/encrypter';

interface AuthUserUseCaseRequest {
    email: string;
    senha: string;
}
type AuthUserUseCaseResponse = Either<
WrongCredentialsError,
{
    accessToken:string
}
>

export class AuthUserUseCase {
	constructor(
		private usuarioRepository: UsuarioRepository,
		private comparer: HashComparer,
        private encrypter: Encrypter
	){}

	async execute({ email, senha, }: AuthUserUseCaseRequest): Promise<AuthUserUseCaseResponse>{
		const usuario = await this.usuarioRepository.findByEmail(email);		

		if(!usuario){
			return left(new WrongCredentialsError());
		}
		const passwordMatches = await this.comparer.compare(senha, usuario.senha_hash);

		if(!passwordMatches){
			return left(new WrongCredentialsError());
		}

		const accessToken = await this.encrypter.encrypt(
			{
				sub: usuario.id.toString(),
				role: usuario.cargo
			}
		);

		return right({ accessToken });
	}
}