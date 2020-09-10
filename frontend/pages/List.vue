
<template>
  <!-- @はv-on:の省略記法 -->
  <div class="list" @dragover.prevent>
    <!-- リストの削除ボタン -->
    <div class="close-button" @click="removeList">x</div>
    <!-- リストのタイトル -->
    <div class="title">{{ title }}</div>
    <!-- カードが1つでも存在する場合は<div></div>の中身を表示 -->
    <div class="cards" v-if="cardCount > 0">
      <Card v-for="({ body }, index) in cards" :key="index" :body="body" :index="index"></Card>
    </div>
    <CardDraft></CardDraft>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import Card from './Card';
import CardDraft from './CardDraft';
// import * as types from '../store/mutation-types';

const List = {
  props: ['title', 'cards', 'index'],
  components: {
    Card,
    CardDraft
  },
  computed: {
    // cardの数を数える関数。v-ifでdivを表示するのか判断するため。
    cardCount() {
      return this.cards.length;
    }
  },
  methods: {
    removeList() {
      this.$store.commit("todo/REMOVE_LIST", {
        listIndex: this.index
      });
    }
  }
}
export default List;
</script>

<style>
.list {
  margin: 0 10px auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 290px;
  width: 290px;
  background-color: #e0e0e0;
  border-radius: 8px;
  padding: 15px;
}

.close-button {
  position: absolute;
  top: 6px;
  right: 14px;
  font-size: 28px;
  cursor: pointer;
}

.close-button:hover {
  opacity: 0.8;
}

.title {
  margin: 5px 0;
  font-size: 24px;
  width: calc(100% - 20px);
  word-break: break-word;
}

.cards {
  margin-top: 15px;
  width: 100%;
}
</style>

// VueでのDrag & Drop
// https://www.tohuandkonsome.site/entry/2018/01/22/223224#dropvue%E3%81%AB%E3%83%89%E3%83%A9%E3%83%83%E3%82%B0--%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E3%81%A7%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E9%81%B8%E6%8A%9E%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B
