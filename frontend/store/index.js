// LocalStorageへの保存
const localStoragePlugin = store => {
  // subscribeはmutationの変化を感知するメソッド。todo.jsのstoreを受け取ってstateを保存。
  store.subscribe((mutation, { todo }) => {
    localStorage.setItem("trollo-lists", JSON.stringify(todo.lists));
  });
};

export const plugins = [localStoragePlugin];

// Vuexのモジュールモードで localStorage に保存する方法
// https://www.tomatoaiu.com/entry/2018/06/01/195741
