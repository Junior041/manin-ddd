import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface UsuarioProps {
  nome: string
  email: string
  cpf: string
  senha_hash: string
  cargo: 'GERENTE'|'DIRETOR'|'MECANICO'
  dataInativacao: Date | null;
  lojaId: UniqueEntityID
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Usuario extends Entity<UsuarioProps> {

	get nome(){
		return this.props.nome;
	}
	get email(){
		return this.props.email;
	}
	get cpf(){
		return this.props.cpf;
	}
	get senha_hash(){
		return this.props.senha_hash;
	}
	get cargo(){
		return this.props.cargo;
	}
	get dataInativacao(){
		return this.props.dataInativacao;
	}
	get lojaId(){
		return this.props.lojaId;
	}

	set nome(nome: string){
		this.props.nome = nome;
		this.touch();
	}
	

	set cargo(cargo: 'GERENTE'|'DIRETOR'|'MECANICO'){
		this.props.cargo = cargo;
		this.touch();

	}
	set dataInativacao(dataInativacao: Date | null){
		this.props.dataInativacao = dataInativacao;
		this.touch();
	}

	private touch(){
		this.props.updatedAt = new Date();
	}

	static create(props: Optional<UsuarioProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID): Usuario {
		const usuario = new Usuario(
			{
				...props,
				createdAt: new Date(),
			},
			id
		);
		return usuario;
	}
}
