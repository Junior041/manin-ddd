import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { MaquinaRepository } from '../../repositories/maquina-repository';
import { Maquina } from '@/domain/enterprise/entities/maquina.entity';

interface AlterStatusMaquinaUseCaseRequest{
    idMaquina: string
}
type AlterStatusMaquinaUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        maquina: Maquina
    }
>
export class AlterStatusMaquinaUseCase {
	constructor(
        private readonly maquinaRepository: MaquinaRepository
	){}

	async execute({
		idMaquina
	}: AlterStatusMaquinaUseCaseRequest): Promise<AlterStatusMaquinaUseCaseResponse> {
		const maquina = await this.maquinaRepository.findById(idMaquina);
		if (!maquina) {
			return left(new ResourceNotFoundError());
		}
		
		maquina.dataInativacao = maquina.dataInativacao ? null : new Date();
        
		await this.maquinaRepository.save(maquina);

		return right({maquina});
	}
}   