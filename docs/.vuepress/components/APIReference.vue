<template>
  <div class="api-reference">
    <div class="api-col">
      <div class="api-block">
        <h3 class="title">Vue Hooks</h3>
        <div class="apis">
          <a v-for="api in vueHooks.apis" :key="api" @click="() => goGoGo(vueHooks.path, api)">{{ api }}()</a>
        </div>
      </div>

      <div class="api-block">
        <h3 class="title">React Hooks</h3>
        <div class="apis">
          <a v-for="api in reactHooks.apis" :key="api" @click="() => goGoGo(reactHooks.path, api)">{{ api }}()</a>
        </div>
      </div>

      <div class="api-block">
        <h3 class="title">Hooks</h3>
        <div class="apis">
          <a v-for="api in hooks.apis" :key="api" @click="() => goGoGo(hooks.path, api)">{{ api }}()</a>
        </div>
      </div>
    </div>

    <div class="api-col">
      <div class="api-block">
        <h3 class="title">Core</h3>
        <div class="apis">
          <a v-for="api in core.apis" :key="api" @click="() => goGoGo(core.path, api)">
            <template v-if="api">{{ api }}() </template>
            <template v-else>
              <hr />
            </template>
          </a>
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
      vueHooks: {
        path: 'vue-hooks',
        apis: ['createLocalStorage', 'createSessionStorage', 'useStorage', 'useStorageHelper'],
      },
      reactHooks: {
        path: 'react-hooks',
        apis: ['createLocalStorage', 'createSessionStorage', 'useStorage', 'useStorageHelper'],
      },
      hooks: {
        path: 'hooks',
        apis: ['createLocalStorage', 'createSessionStorage', 'useStorage', 'useStorageHelper'],
      },
      core: {
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
    };
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
  margin-right: 1em;
  width: calc((100% - 1em) / 2);
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
