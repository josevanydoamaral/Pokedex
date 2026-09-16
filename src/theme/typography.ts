export const typography = {
    fontSizes: {
        caption: 12,
        captionSmall: 14,
        default: 16,
        subtitle: 18,
        section: 22,
        title: 28
    },

    fontWeights: {
        regular: '400',
        semibold: '600',
        bold: '700',
    },

    lineHeights: {
        caption: 16,
        captionSmall: 18,
        default: 22,
        subtitle: 24,
        section: 26,
        title: 34
    }
} as const

export type Typography = typeof typography;