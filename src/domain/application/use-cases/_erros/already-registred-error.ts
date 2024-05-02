import { UseCaseError } from '@/core/errors/use-case-error';

export class AlreadyRegistredError extends Error implements UseCaseError{
	constructor(dado: string){
		super(`Already registred: "${dado}"`);
	}
}