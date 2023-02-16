<template>
  <Details>
      <Summary>{{ summary }}</Summary>
    <slot />
  </Details>
</template>

<script>
export default {
  name: 'ReferencedTypes',
  data() {
    return {
      summary: 'Referenced Types',
    }
  },
  beforeMount() {
    const path = location.pathname;
    if (path.indexOf('/smart-storage/docs/zh/') === 0) {
      this.summary = '引用的类型'
    }
  },
};
</script>
