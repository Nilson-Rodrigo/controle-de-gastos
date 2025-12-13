export class Transacao {
    constructor(
        public valor: number,
        public tipo: "salario" | "receita" | "despesa",
        public categoria: string = "geral",
        public data: Date = new Date()
    ) {}

    validar(): boolean {
        return this.valor > 0 && !isNaN(this.valor);
    }
}
