const key = 'webed';
const storage = sessionStorage;

export const saveState = (state) => {
    try {
        storage.setItem(key, JSON.stringify(state));
    } catch(error) {
        console.warn('Unable to persist state to storage:', error);
    }
};

export const loadState = () => {
    try {
        return JSON.parse(storage.getItem(key));
    } catch(error) {
        console.warn('Failed to retrieve and initialize state from storage:', error);
        return null;
    }
};

export const clearState = () => {
    storage.removeItem(key);
}