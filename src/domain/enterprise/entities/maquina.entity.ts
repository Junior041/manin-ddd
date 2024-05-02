import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface MaquinaProps {
  nome: string;
  lojaId: UniqueEntityID;
  marca: string;
  descricao?: string | null;
  codigo?: string | null;
  dataInativacao: Date | null;
  dataAquisição?: Date | null;
  createdAt: Date;
}

export class Maquina extends Entity<MaquinaProps> {
	get nome(){
		return this.props.nome;
	}
	get lojaId(){
		return this.props.lojaId;
	}
	get marca(){
		return this.props.marca;
	}
	get descricao(){
		return this.props.descricao;
	}
	get codigo(){
		return this.props.codigo;
	}
	get dataInativacao(){
		return this.props.dataInativacao;
	}
	get dataAquisição(){
		return this.props.dataAquisição;
	}
	get createdAt(){
		return this.props.createdAt;
	}
	set nome(nome){
		this.props.nome = nome;
	}
	set marca(marca){
		this.props.marca = marca;
	}
	set descricao(descricao){
		this.props.descricao = descricao;
	}
	set dataInativacao(dataInativacao){
		this.props.dataInativacao = dataInativacao;
	}
	set dataAquisição(dataAquisição){
		this.props.dataAquisição = dataAquisição;
	}

	static create(props: Optional<MaquinaProps, 'createdAt'>, id?: UniqueEntityID) {
		const maquina = new Maquina(
			{
				...props,
				createdAt: new Date(),
			},
			id
		);
		return maquina;
	}
}
