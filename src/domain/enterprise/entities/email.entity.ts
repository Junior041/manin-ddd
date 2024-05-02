import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { ReferenceType } from '@/core/types/reference-type';


export interface EmailProps {
  referenceId: UniqueEntityID;
  referenceType: ReferenceType;
  email: string;
  nome: string
  publico: boolean;
  principal: boolean

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Email extends Entity<EmailProps> {

	get referenceId(){
		return this.props.referenceId;
	}
	get referenceType(){
		return this.props.referenceType;
	}
	get email(){
		return this.props.email;
	}
	get nome(){
		return this.props.nome;
	}
	get publico(){
		return this.props.publico;
	}
	get principal(){
		return this.props.principal;
	}

	set email(email:string){
		this.props.email = email;
		this.touch();
	}
	set nome(nome:string){
		this.props.nome = nome;
		this.touch();
	}
	set publico(publico:boolean){
		this.props.publico = publico;
		this.touch();
	}
	set principal(principal:boolean){
		this.props.principal = principal;
		this.touch();
	}

	private touch(){
		this.props.updatedAt = new Date();
	}

	static create(props: Optional<EmailProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID): Email {
		const email = new Email(
			{
				...props,
				createdAt: new Date(),
			},
			id
		);
		return email;
	}
}
