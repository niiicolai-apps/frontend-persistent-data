
export default class LocalStorageAdapter {
    async get(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    async set(key, value) {
        value = JSON.stringify(value)
        localStorage.setItem(key, value)
    }

    async remove (key) {
        localStorage.removeItem(key)
    }
}