import { HashComparer } from '@/domain/application/cryptography/hashComparer';
import { HashGenerator } from '@/domain/application/cryptography/hashGenerator';

export class FakeHash implements HashGenerator, HashComparer{

	async hash(value: string): Promise<string> {
		return value.concat('-hash-');   
	}

	async compare(senha: string, hash: string): Promise<boolean> {
		return await this.hash(senha) === hash;      
	}

}