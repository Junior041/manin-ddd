import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface EnderecoProps {
  referenceId: UniqueEntityID;
  bairro: string;
  complemeto?: string;
  endereco: string;
  numero: string;
  cep: string;
  estado: string
  cidade: string;
  principal: boolean;
  longitude: number;
  latitude: number;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Endereco extends Entity<EnderecoProps> {

	get referenceId(){
		return this.props.referenceId;
	}
	get bairro(){
		return this.props.bairro;
	}
	get complemeto(): string | undefined{
		return this.props.complemeto;
	}
	get endereco(){
		return this.props.endereco;
	}
	get numero(){
		return this.props.numero;
	}
	get cep(){
		return this.props.cep;
	}
	get estado(){
		return this.props.estado;
	}
	get cidade(){
		return this.props.cidade;
	}
	get principal(){
		return this.props.principal;
	}
	get longitude(){
		return this.props.longitude;
	}
	get latitude(){
		return this.props.latitude;
	}

	set bairro(bairro: string){
		this.props.bairro = bairro;
		this.touch();
	}
	set cep(cep: string){
		this.props.cep = cep;
		this.touch();
	}
	set cidade(cidade: string){
		this.props.cidade = cidade;
		this.touch();
	}
	set endereco(endereco: string){
		this.props.endereco = endereco;
		this.touch();
	}
	set estado(estado: string){
		this.props.estado = estado;
		this.touch();
	}
	set latitude(latitude: number){
		this.props.latitude = latitude;
		this.touch();
	}
	set longitude(longitude: number){
		this.props.longitude = longitude;
		this.touch();
	}
	set numero(numero: string){
		this.props.numero = numero;
		this.touch();
	}
	set principal(principal: boolean){
		this.props.principal = principal;
		this.touch();
	}
	set complemeto(complemeto: string | undefined){
		this.props.complemeto = complemeto;
		this.touch();
	}

	private touch(){
		this.props.updatedAt = new Date();
	}

	static create(props: Optional<EnderecoProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID): Endereco {
		const endereco = new Endereco(
			{
				...props,
				createdAt: new Date(),
			},
			id
		);
		return endereco;
	}
}
