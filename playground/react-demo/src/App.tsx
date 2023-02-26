import { useStorage, useStorageHelper } from '@soft-storage/react-hooks';
import { useCallback, useState } from 'react';
import { storage, protectedStorage } from './storage';
import './App.css';

function App() {
  const {
    strState: { str = '', setStr, resetStr, containsStr },
    numState: { num = 0, setNum, resetNum, containsNum },
    boolState: { bool, setBool, resetBool, containsBool },
    arrState: { arr, setArr, resetArr, containsArr },
    objState: { obj, setObj, resetObj, containsObj },
    nestedObjState: { nestedObj, setNestedObj, resetNestedObj, containsNestedObj },
  } = useStorage(storage);

  const storageHelper = useStorageHelper(storage);

  const {
    testState: { test, setTest },
  } = useStorage(protectedStorage);

  const [arrItem, setArrItem] = useState('');
  const [objKey, setObjKey] = useState('');
  const [nestedArrItem, setNestedArrItem] = useState('');
  const [nestedObjStr, setNestedObjStr] = useState('');

  const triggerError = useCallback(() => {
    window.localStorage.setItem('react_test_protect_key', '123');
  }, []);

  return (
    <>
      <h1>Hello Soft Storage</h1>
      <h2>react_test_key</h2>
      <div className="tool-bar">
        Actions:&nbsp;
        <button onClick={() => storageHelper.initialize()}>Initialize</button>
        &nbsp;&nbsp;&nbsp;
        <span>Size: {storageHelper.size()}</span>
      </div>
      <div className="box">
        <div className="form-item">
          <label>String: </label>
          <input value={str} type="text" onChange={event => setStr(event.currentTarget.value)} />
          <button onClick={() => resetStr()}>Reset</button>
        </div>
        <div className="storage-item">
          <span>(Exist: {containsStr().toString()})&nbsp;</span>
          <span>Storage-String: {str}</span>
        </div>
      </div>
      <div className="box">
        <div className="form-item">
          <label>Number: </label>
          <input value={num} type="number" onChange={event => setNum(+event.currentTarget.value)} />
          <button onClick={() => resetNum()}>Reset</button>
        </div>
        <div className="storage-item">
          <span>(Exist: {containsNum().toString()})&nbsp;</span>
          <span>Storage-Number: {num}</span>
        </div>
      </div>
      <div className="box">
        <div className="form-item">
          <label>Boolean: </label>
          <span style={{ display: 'inline-block', width: 147 }}>
            <input checked={bool} type="checkbox" onChange={event => setBool(event.currentTarget.checked)} />
          </span>
          <button onClick={() => resetBool()}>Reset</button>
        </div>
        <div className="storage-item">
          <span>(Exist: {containsBool().toString()})&nbsp;</span>
          <span>Storage-Boolean: {bool.toString()}</span>
        </div>
      </div>
      <div className="box">
        <div className="form-item">
          <label>Array: </label>
          <input value={arrItem} type="text" onChange={event => setArrItem(event.currentTarget.value)} />
          <button onClick={() => setArr([...arr, arrItem])}>Add</button>
          <button
            onClick={() => {
              arr.pop();
              setArr([...arr]);
            }}
          >
            Pop
          </button>
          <button onClick={() => resetArr()}>Reset</button>
        </div>
        <div className="storage-item">
          <span>(Exist: {containsArr().toString()})&nbsp;</span>
          <span>Storage-Array: {JSON.stringify(arr)}</span>
        </div>
      </div>
      <div className="box">
        <div className="form-item">
          <label>Object: </label>
          <input value={objKey} type="text" onChange={event => setObjKey(event.currentTarget.value)} />
          <button onClick={() => setObj({ ...obj, key: objKey })}>Set</button>
          <button
            onClick={() => {
              delete obj.key;
              setObj({ ...obj });
            }}
          >
            Delete
          </button>
          <button onClick={() => resetObj()}>Reset</button>
        </div>
        <div className="storage-item">
          <span>(Exist: {containsObj().toString()})&nbsp;</span>
          <span>Storage-Object: {JSON.stringify(obj)}</span>
        </div>
      </div>
      <div className="box">
        <div className="form-item">
          <label>Nested-A: </label>
          <input value={nestedArrItem} type="text" onChange={event => setNestedArrItem(event.currentTarget.value)} />
          <button onClick={() => setNestedObj({ ...nestedObj, arr: [...nestedObj.arr, { str: nestedArrItem }] })}>
            Add
          </button>
          <button
            onClick={() => {
              nestedObj.arr.pop();
              setNestedObj({ ...nestedObj, arr: [...nestedObj.arr] });
            }}
          >
            Pop
          </button>
        </div>
      </div>
      <div className="box">
        <div className="form-item">
          <label>Nested-O: </label>
          <input value={nestedObjStr} type="text" onChange={event => setNestedObjStr(event.currentTarget.value)} />
          <button onClick={() => setNestedObj({ ...nestedObj, obj: { str: nestedObjStr } })}>Set</button>
          <button
            onClick={() => {
              delete nestedObj.obj.str;
              setNestedObj({ ...nestedObj });
            }}
          >
            Delete
          </button>
          <button onClick={() => resetNestedObj()}>Reset</button>
        </div>
        <div className="storage-item">
          <span>(Exist: {containsNestedObj().toString()})&nbsp;</span>
          <span>Storage-Nested-Object: {JSON.stringify(nestedObj)}</span>
        </div>
      </div>
      <h2>react_test_protect_key</h2>
      <div className="box">
        <div className="form-item">
          <label>Test: </label>
          <input value={test} type="text" onChange={event => setTest(event.currentTarget.value)} />
        </div>
        <div className="storage-item">Storage-Test: {test}</div>
      </div>
      When you click (<button onClick={triggerError}>localStorage.setItem('react_test_protect_key', '123')</button>
      ), you will receiver an error in the console.
    </>
  );
}

export default App;
