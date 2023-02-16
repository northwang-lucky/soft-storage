<template>
  <Details>
    <Summary>{{ summary }}</Summary>
    <slot />
  </Details>
</template>

<script>
export default {
  name: 'ReferencedTypes',
  computed: {
    summary() {
      const path = location.pathname;
      return path.indexOf('/smart-storage/docs/zh/') !== 0 ? 'Referenced Types' : '引用的类型';
    },
  },
};
</script>
