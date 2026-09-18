export type Kind = 
    'fire' | 'water' | 'grass' | 'electric' |
    'normal' | 'poison' | 'flying' | 'rock' | 'bug' | 'dark' |
    'dragon' | 'fairy' | 'fighting' | 'ghost' | 'ground' | 'ice' | 'psychic' | 'steel'

export interface Pokemon {
    id: number;
    name: string;
    kinds: Kind[];
    spriteUrl: string;
    weight: number;
    height: number;
}