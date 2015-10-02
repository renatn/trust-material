export default class MainUtils {
    static currencySymbol(code) {
        switch(code) {
            case 810:
                return '\u20bd';
            case 840:
                return '\u0024';
            case 978:
                return '\u20AC';
            default:
                return '?';
        }
    }
}