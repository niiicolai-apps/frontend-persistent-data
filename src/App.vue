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

