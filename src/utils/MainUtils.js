export default class MainUtils {
    static currencySymbol(code) {
        switch(code) {
            case 810:
                return '\u20bd';
            case 840:
                return '$';
            case 978:
                return '&#x20AC;';
            default:
                return '?';
        }
    }
}