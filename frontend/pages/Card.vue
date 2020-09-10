<template>
  <!-- @はv-on:の省略記法 -->
  <!-- @dropは項目が有効なドロップ対象にドロップされた場合のイベントハンドラー -->
  <!-- @dragstartはユーザーが項目をドラッグ開始した場合のイベントハンドラー -->
  <div class="card" draggable="true" @drop="onDrop" @dragstart="onDragStart" @dragover.prevent>
    <div class="close-button" @click="removeCardFromList">x</div>
    <div class="body">{{ body }}</div>
    <div class="arrows">
      <div :class="['arrow', 'left', movableToLeft ? '' : 'disabled']" @click="moveCardToLeft">←</div>
      <div :class="['arrow', 'right', movableToRight ? '' : 'disabled']" @click="moveCardToRight">→</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
// import * as types from '../store/mutation-types.js';

const Card = {
  // List.vueからprops受け取り
  props: ['body', 'index'],
  computed: {
    movableToLeft() {
      return this.$parent.index > 0;
    },
    movableToRight() {
      return this.listsCount > this.$parent.index + 1;
    },
    ...mapGetters("todo",[
      'listsCount'
    ])
  },
  methods: {
    removeCardFromList() {
      //
      this.$store.commit("todo/REMOVE_CARD_FROM_LIST", {
        from: this.$parent.index,
        cardIndex: this.index
      });
    },
    moveCardToRight() {
      if(this.movableToRight) {
        this.moveCardToList({
          from: {
            listIndex: this.$parent.index,
            cardIndex: this.index
          },
          to: {
            listIndex: this.$parent.index + 1,
            cardIndex: null
          }
        });
      }
    },
    moveCardToLeft() {
      if(this.movableToLeft) {
        this.moveCardToList({
          from: {
            listIndex: this.$parent.index,
            cardIndex: this.index
          },
          to: {
            listIndex: this.$parent.index - 1,
            cardIndex: null
          }
        });
      }
    },
    onDragStart({ dataTransfer }) {
      dataTransfer.effectAllowed = 'move';
      dataTransfer.setData("application/json", JSON.stringify({
        from: {
          listIndex: this.$parent.index,
          cardIndex: this.index
        }
      }));
    },
    onDrop({ dataTransfer }) {
      const { from } = JSON.parse(dataTransfer.getData("application/json"));
      const to = {
        listIndex: this.$parent.index,
        cardIndex: this.index
      }
      this.moveCardToList({ from, to });
    },
    ...mapMutations({
      //
      moveCardToList: "todo/MOVE_CARD_TO_LIST"
    })
  }
}
export default Card;
</script>

<style>
.card {
  margin-bottom: 15px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 30px 15px 40px;
  background-color: #fff;
  border-radius: 8px;
  width: calc(100% - 30px);
  cursor: pointer;
}

.card > .close-button {
  position: absolute;
  top: 6px;
  right: 15px;
  font-size: 22px;
  cursor: pointer;
}

.card > .close-button:hover {
  opacity: 0.8;
}

.card > .body {
  font-size: 18px;
  width: 100%;
  word-wrap: break-word;
}

.card > .arrows {
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

.card > .arrows > .arrow {
  margin: 10px;
  font-size: 18px;
  color: #ff003f;
  cursor: pointer;
}

.card > .arrows > .arrow:hover {
  opacity: 0.8;
}

.card > .arrows > .arrow.disabled {
  color: #999;
  pointer-events: none;
}

.card:last-child {
  margin-bottom: 0;
}
</style>
