import { ref } from 'vue'
import LocalStorageAdapter from './LocalStorageAdapter.js'

const ADAPTERS = {
    LOCAL_STORAGE: 'local_storage'
}

const adapter = ref(null)
const cache = {}

export const usePersistentData = (useCache=true) => {

    const setAdapter = (adapterName, custom=false) => {
        if (custom) {
            adapter.value = custom
            return
        }

        switch (adapterName) {
            case 'local_storage':
                adapter.value = new LocalStorageAdapter()
                break
            default:
                throw new Error('Unknown adapter')
        }
    }

    const get = async (key) => {
        if (!adapter.value) throw new Error('Adapter not set')
        if (cache[key] && useCache) return cache[key]
        const value = await adapter.value.get(key)
        if (useCache) cache[key] = value
        return value
    }

    const set = async (key, value) => {
        if (!adapter.value) throw new Error('Adapter not set')
        await adapter.value.set(key, value)
        if (useCache) cache[key] = value
    }

    const remove = async (key) => {
        if (!adapter.value) throw new Error('Adapter not set')
        await adapter.value.remove(key)
        if (useCache) delete cache[key]
    }

    return {
        ADAPTERS,
        setAdapter,
        get,
        set,
        remove
    }
}
