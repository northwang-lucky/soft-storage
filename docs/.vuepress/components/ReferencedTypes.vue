<template>
  <Details>
    <Summary>{{ summary }}</Summary>
    <slot></slot>
  </Details>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ReferencedTypes',
  data() {
    return {
      summary: 'Referenced Types',
    };
  },
  beforeMount() {
    const path = location.pathname;
    if (path.indexOf('/docs/zh/') === 0) {
      this.summary = '引用的类型';
    }
  },
});
</script>
