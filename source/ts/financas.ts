export class Financa {
    constructor(public valor: number) {}

    public validar(): boolean {
        return !isNaN(this.valor) && this.valor > 0;
    }

    public formatar(): string {
        return `R$ ${this.valor.toFixed(2)}`;
    }

    public static criar(valor: number): Financa | null {
        const financa = new Financa(valor);
        return financa.validar() ? financa : null;
    }
}
