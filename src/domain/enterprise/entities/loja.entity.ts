import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface LojaProps {
  razaoSocial: string;
  cnpj: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Loja extends Entity<LojaProps> {

	get razaoSocial(){
		return this.props.razaoSocial;
	}
	get cnpj(){
		return this.props.cnpj;
	}
	get ativo(){
		return this.props.ativo;
	}
	set razaoSocial(razaoSocial: string){
		this.props.razaoSocial = razaoSocial;
		this.touch();
	}
	set ativo(ativo: boolean){
		this.props.ativo = ativo;
		this.touch();
	}

	private touch(){
		this.props.updatedAt = new Date();
	}

	static create(props: Optional<LojaProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID): Loja {
		const loja = new Loja(
			{
				...props,
				createdAt: new Date(),
			},
			id
		);
		return loja;
	}
}
