export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        other: {
        'official-artwork': {
            front_default: string;
        };
        };
    };
    types: Array<{type: {name: string;};}>;
    height: number;
    weight: number;
}