import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ComponenteProps {
    maquinaId: UniqueEntityID
	nome: string;
    descricao: string;
    valorUnitario: 'UNIDADE'|'LITROS'|'METROS';
    identificador: string | null;
    valor: number;
    createdAt: Date
}

export class Componente extends Entity<ComponenteProps> {

	get maquinaId(){
		return this.props.maquinaId;
	}
	get nome(){
		return this.props.nome;
	}
	get descricao(){
		return this.props.descricao;
	}
	get valorUnitario(){
		return this.props.valorUnitario;
	}
	get identificador(){
		return this.props.identificador;
	}
	get valor(){
		return this.props.valor;
	}
	get createdAt(){
		return this.props.createdAt;
	}

	set nome(nome){
		this.props.nome = nome;
	}
	set descricao(descricao){
		this.props.descricao = descricao;
	}
	set valorUnitario(valorUnitario){
		this.props.valorUnitario = valorUnitario;
	}
	set identificador(identificador){
		this.props.identificador = identificador;
	}
	set valor(valor){
		this.props.valor = valor;
	}

	static create(props: Optional<ComponenteProps, 'createdAt'>, id?: UniqueEntityID): Componente {
		return new Componente({
			...props,
			createdAt: new Date()
		}, id);
	}
}