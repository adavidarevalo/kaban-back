export const pinoConfig = {
    level: 'info',
    formatters: {
        level: (label: string) => ({ level: label }),
    },
    filters: {
        statusCode: (status: number) => status >= 500,
    }
}