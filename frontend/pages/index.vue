<template>
  <div class="app">
    <header>
      <h1 class="logo">KanbanBoard</h1>
    </header>
    <main>
      <!-- $store.state.todo.listsはstateの取得。stateとtodoの順番に注意 -->
      <List
        v-for="({ title, cards }, index) in $store.state.todo.lists"
        :key="index"
        :title="title"
        :cards="cards"
        :index="index"
      ></List>
      <ListDraft></ListDraft>
    </main>
  </div>
</template>

//  componentのメインページ。 //全体象は以下。
// dafautlt.vue <- index.vue <- List.vue , ListDraft
// List.vue <- Card.vue , CardDraft.vue

<script>
// import { mapState } from 'vuex';

// ListとListDraftを読み込んでhtmlで使用出来るようexport
import List from './List';
import ListDraft from './ListDraft';

export default {
    components: {
    List,
    ListDraft
  },
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}

body {
  background: #b24592; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f15f79,
    #b24592
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f15f79,
    #b24592
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

h1,
h2,
h3,
h4 {
  margin: 0;
}

@font-face {
  font-family: "Noto Sans Japanese";
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.woff2)
      format("woff2"),
    url(https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.woff)
      format("woff"),
    url(https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.otf)
      format("opentype");
}

.app {
  font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
  font-weight: 700;
  color: #242424;
  width: 100%;
  height: 100%;
}

.app > header {
  padding: 0 20px;
  display: flex;
  align-items: center;
  width: calc(100% - 40px);
  height: 100px;
}

.app > main {
  padding: 0 20px;
  display: flex;
  overflow-x: scroll;
  width: calc(100% - 40px);
  height: calc(100% - 100px);
}

.logo {
  font-family: "Pacifico", cursive;
  font-weight: normal;
  font-size: 48px;
  color: #fff;
}
</style>
