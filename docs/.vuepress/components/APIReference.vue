<template>
  <div class="api-reference">
    <div class="api-col" v-for="(apiCol, index) in apiCols" :key="index">
      <div class="api-block" v-for="block in apiCol" :key="block.path">
        <h3 class="title">{{ block.path | title }}</h3>
        <div class="apis">
          <RouterLink v-for="api in block.apis" :key="api" :to="`./${block.path}.html#${api.toLowerCase()}`">
            <template v-if="api">{{ api }}()</template>
            <template v-else><hr /></template>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'APIReference',
  data() {
    return {
      apiCols: [
        [
          {
            path: 'vue-hooks',
            apis: ['createLocalStorage', 'createSessionStorage', 'useStorage', 'useStorageHelper'],
          },
          {
            path: 'react-hooks',
            apis: ['createLocalStorage', 'createSessionStorage', 'useStorage', 'useStorageHelper'],
          },
          {
            path: 'hooks',
            apis: ['createLocalStorage', 'createSessionStorage', 'useStorage', 'useStorageHelper'],
          },
        ],
        [
          {
            path: 'core',
            apis: [
              'RootNode',
              'rootNode.getItem',
              'rootNode.setItem',
              'rootNode.removeItem',
              'rootNode.clear',
              'rootNode.contains',
              'rootNode.size',
              'rootNode.getHelper',
              '',
              'helper.getRootValue',
              'helper.setRootValue',
              'helper.removeRootValue',
              'helper.getStorageKey',
              'helper.getStorageType',
              'helper.getExistence',
              'helper.protect',
              'helper.cancelProtect',
            ],
          },
          {
            path: 'shared',
            apis: ['restorePrefixedKey', 'restoreSuffixedKey'],
          },
        ],
      ],
    };
  },
  filters: {
    title(value) {
      return value.replace(/^[a-z]/, c => c.toUpperCase()).replace(/-([a-z])/, (_, f) => ` ${f.toUpperCase()}`);
    },
  },
  methods: {
    /**
     * @param {string} path
     * @param {string} api
     */
    goGoGo(path, api) {
      this.$router.push(`./${path}.html#${api.toLowerCase()}`);
    },
  },
};
</script>

<style scoped>
.api-reference {
  display: flex;
  flex-wrap: wrap;
}

.api-col {
  width: 100%;
}

@media screen and (min-width: 960px) {
  .api-col {
    margin-right: 1em;
    width: calc((100% - 1em) / 2);
  }
}

.api-col:nth-child(even) {
  margin-right: 0;
}

.api-block {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 28px 32px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 1em;
}

.api-block .title {
  color: #42b883;
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 1em;
}

.api-block .apis {
  display: flex;
  flex-direction: column;
}

.api-block .apis > a {
  color: #476582;
  cursor: pointer;
  margin-bottom: 0.45em;
}

.api-block .apis > a:hover {
  text-decoration: none;
  color: #42b883;
}

.api-block .apis > a:last-child {
  margin-bottom: 0;
}
</style>
