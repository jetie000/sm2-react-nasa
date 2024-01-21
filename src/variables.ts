export const variables = {
    API_URL: 'https://api.nasa.gov/planetary',
    DAYS_OFFSET: 20,
    API_KEY: 'Rbfb4CHrNccEXUuCgHFWdVHr9i8rdq10Nzz6mKex',
    DateToString: (date: Date) => date.getFullYear() +
        '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) +
        '-' + (date.getDate() < 10 ? '0' + (date.getDate()) : (date.getDate())),
    PICS_PER_PAGE: 20
}