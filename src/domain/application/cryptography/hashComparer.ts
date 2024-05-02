export abstract class HashComparer {
    abstract compare(senha: string, hash: string): Promise<boolean>;
}