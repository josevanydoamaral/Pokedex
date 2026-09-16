export function cmToM(value: number): number {
    const v = Number(value) / 100;
    return Number(v.toFixed(2));
}

export function gToKg(value: number): number {
    const v = Number(value) / 1000;
    return Number(v.toFixed(2));
}