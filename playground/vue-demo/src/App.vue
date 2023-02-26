<script setup lang="tsx">
import { useStorage, useStorageHelper } from '@soft-storage/vue-hooks';
import { ref } from 'vue';
import { storage, protectedStorage } from './storage';

const {
  refs: { str, num, bool, arr, obj, nestedObj },
  resetters: { resetStr, resetNum, resetBool, resetArr, resetObj, resetNestedObj },
  checkers: { containsStr, containsNum, containsBool, containsArr, containsObj, containsNestedObj },
} = useStorage(storage);

const storageHelper = useStorageHelper(storage);

const {
  refs: { test },
} = useStorage(protectedStorage);

const arrItem = ref('');
const objKey = ref('');
const nestedArrItem = ref('');
const nestedObjStr = ref('');

const triggerError = () => {
  window.localStorage.setItem('vue_test_protect_key', '123');
};
</script>

<template>
  <h1>Hello Soft Storage</h1>
  <h2>vue_test_key</h2>
  <div class="tool-bar">
    Actions:
    <button @click="() => storageHelper.initialize()">Initialize</button>
    &nbsp;
    <span>Size: {{ storageHelper.size() }}</span>
  </div>
  <div class="box">
    <div class="form-item">
      <label>String: </label>
      <input v-model="str" type="text" />
      <button @click="() => resetStr()">Reset</button>
    </div>
    <div class="storage-item">
      <span>(Exist: {{ containsStr().toString() }})&nbsp;</span>
      <span>Storage-String: {{ str }}</span>
    </div>
  </div>
  <div class="box">
    <div class="form-item">
      <label>Number: </label>
      <input v-model="num" type="number" />
      <button @click="() => resetNum()">Reset</button>
    </div>
    <div class="storage-item">
      <span>(Exist: {{ containsNum().toString() }})&nbsp;</span>
      <span>Storage-Number: {{ num }}</span>
    </div>
  </div>
  <div class="box">
    <div class="form-item">
      <label>Boolean: </label>
      <span :style="{ display: 'inline-block', width: '147px' }">
        <input v-model="bool" type="checkbox" />
      </span>
      <button @click="() => resetBool()">Reset</button>
    </div>
    <div class="storage-item">
      <span>(Exist: {{ containsBool().toString() }})&nbsp;</span>
      <span>Storage-Boolean: {{ bool.toString() }}</span>
    </div>
  </div>
  <div class="box">
    <div class="form-item">
      <label>Array: </label>
      <input v-model="arrItem" type="text" />
      <button @click="() => arr.push(arrItem)">Add</button>
      <button @click="() => arr.pop()">Pop</button>
      <button @click="() => resetArr()">Reset</button>
    </div>
    <div class="storage-item">
      <span>(Exist: {{ containsArr().toString() }})&nbsp;</span>
      <span>Storage-Array: {{ JSON.stringify(arr) }}</span>
    </div>
  </div>
  <div class="box">
    <div class="form-item">
      <label>Object: </label>
      <input v-model="objKey" type="text" />
      <button @click="() => (obj.key = objKey)">Set</button>
      <button @click="() => delete obj.key">Delete</button>
      <button @click="() => resetObj()">Reset</button>
    </div>
    <div class="storage-item">
      <span>(Exist: {{ containsObj().toString() }})&nbsp;</span>
      <span>Storage-Object: {{ JSON.stringify(obj) }}</span>
    </div>
  </div>
  <div class="box">
    <div class="form-item">
      <label>Nested-A: </label>
      <input v-model="nestedArrItem" type="text" />
      <button @click="() => nestedObj.arr.push({ str: nestedArrItem })">Add</button>
      <button @click="() => nestedObj.arr.pop()">Pop</button>
    </div>
  </div>
  <div class="box">
    <div class="form-item">
      <label>Nested-O: </label>
      <input v-model="nestedObjStr" type="text" />
      <button @click="() => (nestedObj.obj.str = nestedObjStr)">Set</button>
      <button @click="() => delete nestedObj.obj.str">Delete</button>
      <button @click="() => resetNestedObj()">Reset</button>
    </div>
    <div class="storage-item">
      <span>(Exist: {{ containsNestedObj().toString() }})&nbsp;</span>
      <span>Storage-Nested-Object: {{ JSON.stringify(nestedObj) }}</span>
    </div>
  </div>
  <h2>vue_test_protect_key</h2>
  <div class="box">
    <div class="form-item">
      <label>Test: </label>
      <input v-model="test" type="text" />
    </div>
    <div class="storage-item">Storage-Test: {{ test }}</div>
  </div>
  When you click (
  <button @click="triggerError">localStorage.setItem('vue_test_protect_key', '123')</button>
  ), you will receiver an error in the console.
</template>

<style>
input {
  margin: 0;
}

.box button {
  margin-left: 12px;
  width: 60px;
}

.box {
  display: flex;
  margin-bottom: 8px;
}

.form-item {
  margin-right: 30px;
  width: 500px;
}

.form-item label {
  width: 100px;
  display: inline-block;
  text-align: end;
  margin-right: 6px;
}

.tool-bar {
  padding-bottom: 24px;
}

.storage-item span:first-child {
  width: 100px;
  display: inline-block;
}
</style>
