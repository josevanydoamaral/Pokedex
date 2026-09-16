export const colors = {
    primary: "#E3350D", // primary buttons, headers, favorite active, online badge
    darkPrimary: "#B32B0D", // pressed, hover, header, etc...
    secondary: "#2C3E50", // nav text
    background: "#F4F5F7", // background
    surface: "#FFFFFF", // card background
    success: "#2ECC71", // success state
    warning: "#F5A623", // pending state
    error: "#E74C3C", // error state, offline badge, delete button,
    primaryText: "#1C1C1E", // body and titles
    secondaryText: "#8A8F98", // placeholders,
    pokemonTypes: {
        fire: "#F08030",
        water: "#6890F0",
        grass: "#78C850",
        electric: "#F8D030",
        normal: "#A8A878",
        poison: "#A040A0",
        flying: "#A890F0",
        rock: "#B8A038",
        bug: "#A8B820",
        dark: "#705848",
        dragon: "#7038F8",
        fairy: "#EE99AC",
        fighting: "#C03028",
        ghost: "#705898",
        ground: "#E0C068",
        ice: "#98D8D8",
        psychic: "#F85888",
        steel: "#B8B8D0"
    }
} as const

export type Colors = typeof colors;