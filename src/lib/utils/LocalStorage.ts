export default class LocalStorage {

    public static setItem(key: string, value: any) {
        if (typeof window === 'undefined') {
            throw new Error('LocalStorage.setItem: window is undefined');
        }
        localStorage.setItem(key, value);
    }
    public static getItem(key: string) {
        if (typeof window === "undefined") {
            throw new Error('LocalStorage.getItem: window is undefined');
        }
        return localStorage.getItem(key);
    }
    
    public static removeItem(key: string) {
        if (typeof window === "undefined") {
            throw new Error('LocalStorage.removeItem: window is undefined');
        }
        localStorage.removeItem(key);
    }
    public static clear() {
        if (typeof window === "undefined") {
            throw new Error('LocalStorage.clear: window is undefined');
        }
        localStorage.clear();
    }
}