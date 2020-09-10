<template>
  <!-- :はv-bindの省略記法 -->
  <!-- @はv-onの省略記法 -->
  <!-- :class="classList"はclassを動的に変化させている。 -->
  <!-- @submit.prevent="addList"は下で定義したmethodを呼び出している。 -->
  <form :class="classList" @submit.prevent="addCardToList" @drop="onDrop" @dragover.prevent>
    <input
      type="text"
      class="text-input"
      contenteditable="true"
      v-model="body"
      ref="textInput"
      placeholder="Add new card"
    />
    <!-- isEditing か isAddable がtrueならボタン表示 -->
    <button type="submit" class="add-button" v-if="isEditing || isAddable">Add</button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex';
// import * as types from '../store/mutation-types';

const CardDraft = {
  data() {
    return {
      isEditing: false,
      body: ''
    }
  },
  computed: {
    classList() {
      // classへのvind用の配列作成。
      const classList = ['card-draft'];
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
      return this.body.length > 0;
    },
  },
  methods: {
    addCardToList() {
      // inputに文字が入ってているならstateに追加
      if(this.isAddable){
      this.$store.commit("todo/ADD_CARD_TO_LIST", {
        to: this.$parent.index,
        body: this.body
      })};
      this.body = '';
    },
    // DataTransfer.getData() メソッドは、指定した型のドラッグデータを (DOMString として) 受け取ります。
    onDrop({ dataTransfer }) {
      const { from } = JSON.parse(dataTransfer.getData("application/json"));
      const to = {
        listIndex: this.$parent.index,
        cardIndex: null
      }
      this.moveCardToList({ from, to });
    },
    ...mapMutations({
      moveCardToList: "todo/MOVE_CARD_TO_LIST"
    })
  }
}

export default CardDraft;
</script>

 <style>
.card-draft {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.card-draft > .text-input {
  padding: 15px;
  width: calc(100% - 30px);
  background-color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #242424;
  cursor: pointer;
  overflow: overlay;
}

.card-draft > .text-input:focus {
  outline: 0;
  cursor: initial;
}

.card-draft > .add-button {
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

.card-draft > .add-button:hover {
  opacity: 0.8;
}

.card-draft.active > .text-input {
  background-color: #fff;
}

.card-draft.addable > .text-input {
  background-color: #fff;
}

.card-draft.active > .add-button {
  pointer-events: none;
}

.card-draft.addable > .add-button {
  background-color: #ffa955;
  pointer-events: auto;
  cursor: pointer;
}

.card-draft.addable > .add-button:active {
  background-color: #d76a00;
}
</style>
