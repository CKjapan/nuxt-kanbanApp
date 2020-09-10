//localStorageからtrollo-listsとういkeyのobjを取得
const savedLists = localStorage.getItem("trollo-lists");

export const state = () => ({
  //条件式 ? Trueの処理 : Falseの処理
  // savedListsがtrue()ならsavedListsを入れてflseなら下の3つを入れる。state={list:[{},{},{}]}
  lists: savedLists
    ? JSON.parse(savedLists)
    : [
        {
          title: "To Do",
          cards: [{ body: "原価償却" }, { body: "現金実査" }]
        },
        {
          title: "仕掛中",
          cards: [{ body: "給与計算" }]
        },
        {
          title: "後回し",
          cards: []
        }
      ]
});

export const mutations = {
  // 旧stateとtitleを受け取って
  // lists配列にオブジェクトを加える。
  ADD_LIST: function(state, { title }) {
    state.lists.push({ title, cards: [] });
  },
  // 旧stateとlistIndexを受け取って
  // splice関数でlistIndex番号の配列を削除
  // splice関数の第1引数は消す配列の番号、第2引数は番号以降何個消すか指定
  REMOVE_LIST: function(state, { listIndex }) {
    state.lists.splice(listIndex, 1);
  },

  // 旧stateと{ to, body }を受け取って指定のリストのcards配列にオブェクトを入れる
  ADD_CARD_TO_LIST: function(state, { to, body }) {
    state.lists[to].cards.push({ body });
  },
  // 旧stateと{ from, cardIndex }を受け取ってsplice関数で指定のリストのcardIndex番号の配列を削除
  REMOVE_CARD_FROM_LIST: function(state, { from, cardIndex }) {
    state.lists[from].cards.splice(cardIndex, 1);
  },

  // 旧stateと{ from, to }を受け取って
  MOVE_CARD_TO_LIST: function(state, { from, to }) {
    // 移動元のカードの情報を一旦格納
    const targetCard = state.lists[from.listIndex].cards[from.cardIndex];
    // 移動元のカードを削除
    state.lists[from.listIndex].cards.splice(from.cardIndex, 1);
    // 移動先のカードインデックスがnullで無いなら
    if (to.cardIndex !== null) {
      // 消して入れる
      state.lists[to.listIndex].cards.splice(to.cardIndex, 0, targetCard);
    } else {
      // nullでなら ただ入れる
      state.lists[to.listIndex].cards.push(targetCard);
    }
  }
};

// listの数取得。横の移動用。
export const getters = {
  listsCount: state => state.lists.length
};

// Nuxt.jsのストアをモジュールモードで使用するときのTips
// https://qiita.com/y-miine/items/028c73aa3f87e983ed4c
