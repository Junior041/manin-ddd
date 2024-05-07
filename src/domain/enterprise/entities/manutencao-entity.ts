import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ManutencaoProps {
  compontentId: UniqueEntityID;
  lojaId: UniqueEntityID;
  urgencia: 1 | 2 | 3;
  dataManutencao: Date;
  dataRealizacao?: Date | null;
  realizadaPor?: UniqueEntityID | null;
  tipoManutencao: 'PREVENTIVA' | 'CORRETIVA' | 'EMERGENCIAL' | 'PREDITIVA';
  createdAt: Date;
}

export class Manutencao extends Entity<ManutencaoProps> {

	get compontentId(){
		return this.props.compontentId;
	}
	get lojaId(){
		return this.props.lojaId;
	}
	get urgencia(){
		return this.props.urgencia;
	}
	get dataManutencao(){
		return this.props.dataManutencao;
	}
	get dataRealizacao(){
		return this.props.dataRealizacao;
	}
	get realizadaPor(){
		return this.props.realizadaPor;
	}
	get tipoManutencao(){
		return this.props.tipoManutencao;
	}
	get createdAt(){
		return this.props.createdAt;
	}

	set dataRealizacao(dataRealizacao){
		this.props.dataRealizacao = dataRealizacao;
	}
	set realizadaPor(realizadaPor){
		this.props.realizadaPor = realizadaPor;
	}

	static create(props: Optional<ManutencaoProps, 'createdAt'>, id?: UniqueEntityID) {
		const manutencao = new Manutencao(
			{
				...props,
				createdAt: new Date(),
			},
			id
		);
		return manutencao;
	}
}
