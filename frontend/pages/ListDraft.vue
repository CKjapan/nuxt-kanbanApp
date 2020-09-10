<template>
  <!-- :はv-bindの省略記法 -->
  <!-- @はv-onの省略記法 -->
  <!-- :class="classList"はclassを動的に変化させている。 -->
  <!-- @submit.prevent="addList"は下で定義したmethodを呼び出している。 -->
  <form v-on:submit.prevent="addList" :class="classList">
    <input
      type="text"
      class="text-input"
      contenteditable="true"
      v-model="title"
      ref="textInput"
      placeholder="Add new list"
    />
    <!-- isEditing か isAddable がtrueならボタン表示 -->
    <button type="submit" class="add-button" v-if="isEditing || isAddable">Add</button>
  </form>
</template>

<script>
// import * as types from '../store/mutation-types';
const ListDraft = {
  data() {
    return {
      isEditing: false,
      title: '',
    }
  },
  computed: {
    classList() {
      // classへのvind用の配列作成。
      const classList = ['list-draft'];
      // isEditingがtrue(inputにフォーカスしている)なら配列にactiveを追加。//button表示
      if(this.isEditing) {
        classList.push('active');
      }
      // isAddableがtrue(inputに文字が入ってている)なら配列にaddableを追加。//button表示
      if(this.isAddable) {
        classList.push('addable');
      }
      // 上のhtmlで使用出来るようにexport。
      return classList;
    },
    // inputに文字が入ってているかcheckする関数
    isAddable() {
      return this.title.length > 0;
    },
  },
  methods: {
    // inputに文字が入ってているならstateに追加
    addList() {
      if(this.isAddable){
      this.$store.commit("todo/ADD_LIST", {
        to: this.$parent.index,
        title: this.title
      })};
      this.title = '';
    }
  }
}

export default ListDraft;
</script>

<style>
.list-draft {
  margin: 0 10px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 320px;
  width: 320px;
}

.list-draft > .text-input {
  padding: 20px 15px;
  width: calc(100% - 30px);
  background-color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #242424;
  cursor: pointer;
  overflow: overlay;
}

.list-draft > .text-input:focus {
  outline: 0;
  cursor: initial;
}

.list-draft > .add-button {
  margin-top: 15px;
  padding: 15px 18px;
  background-color: #999;
  border: none;
  border-radius: 8px;
  font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
}

.list-draft > .add-button:hover {
  opacity: 0.8;
}

.list-draft.active > .text-input {
  background-color: #fff;
}

.card-draft.addable > .text-input {
  background-color: #fff;
}

.list-draft.active > .add-button {
  pointer-events: none;
}

.list-draft.addable > .add-button {
  background-color: #ffa955;
  pointer-events: auto;
  cursor: pointer;
}

.list-draft.addable > .add-button:active {
  background-color: #d76a00;
}

.list-draft.addable > .add-button:active {
  background-color: #d76a00;
}
</style>
