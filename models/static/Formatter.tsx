export default class Formatter {

    static toCurrency(value: any, currency: string = 'USD', locale: string = 'en-US'): string {

        try {
            return parseFloat(value).toLocaleString(locale,
                {
                    style: 'currency',
                    currency: currency.toUpperCase()
                });
        }
        catch (error) {
            console.error(error);
            return 'Error';
        }
    }
}