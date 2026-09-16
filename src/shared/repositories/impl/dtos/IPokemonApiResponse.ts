export interface IPokemonApiResponse {
    id: number;
    name: string;
    height: number
    weight: number,
    types: Array<{ type: { name: string }}>,
    sprites: {
        front_default: string | null,
    }
}