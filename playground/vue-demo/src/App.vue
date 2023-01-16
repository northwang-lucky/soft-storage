<script setup lang="tsx">
import { useStorage } from './storage';

const {
  storage: { nestObj },
} = useStorage();

nestObj.set({ arr: [{ str: 'arr' }], sub: { str: 'sub' } });
console.log(nestObj.get());
setTimeout(() => {
  nestObj.remove();
}, 3000);
</script>

<template>
  <h1>Hello Smart Storage</h1>
</template>
