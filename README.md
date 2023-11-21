# Install

```bash
$ npm install
```

# Release
1. Ensure 7zip is installed (https://www.7-zip.org/download.html)
2. Set system env. variable: 
```bash
export PATH=$PATH:/c/Program\ Files/7-Zip
```
3. Run the release script:
```bash
$ bash release.sh
```
4. Create and publish a new release on https://github.com/niiicolai-apps/frontend-persistent-data/releases/new (Remember to include the zip created in step 3)

# Usage in development

```bash
$ npm run dev
```

# Usage in other projects

## Install in other projects
Remember to replace `#v1.0.0` with the needed version.
```bash
npm install --save niiicolai-apps/frontend-persistent-data#v1.0.0
```

## Update in other projects
```bash
npm update niiicolai-apps/frontend-persistent-data
```

## How to

```vue
<script setup>
import PersistentData from '../index.js'
import { ref, onMounted } from 'vue'

const d = ref(null);
const pd = PersistentData.usePersistentData();
pd.setAdapter(pd.ADAPTERS.LOCAL_STORAGE);

onMounted(async () => {
  d.value = await pd.get('stats');
})

const set = async (key, value) => {
  pd.set(key, value);
  d.value = await pd.get(key);
}

const remove = async (key) => {
  pd.remove(key);
  d.value = await pd.get(key);
}
</script>

<template>
  <div>
    <button @click="set('stats', { hp: Math.random()*100, mp: 50 })">Set</button>
    <button @click="remove('stats')">Remove</button>
  </div>

  <div v-if="d">
    <p>HP: {{ d.hp }}</p>
    <p>MP: {{ d.mp }}</p>
  </div>
</template>
```