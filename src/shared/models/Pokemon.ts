export type Kind = 
'fire' | 'water' | 'grass' | 'electric' | 
'normal' | 'poison' | 'flying' | 'rock'

export interface Pokemon {
    id: number;
    name: string;
    kinds: Kind[];
    spriteUrl: string;
    weight: number;
    height: number;
}