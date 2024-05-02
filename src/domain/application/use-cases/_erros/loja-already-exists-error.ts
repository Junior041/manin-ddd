import { UseCaseError } from '@/core/errors/use-case-error';

export class LojaAlreadyExists extends Error implements UseCaseError{
	constructor(){
		super('Loja already exists');
	}
}