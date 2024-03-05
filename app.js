function getRndomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },

  methods: {
    attackMonster() {
      attackValue = getRndomValue(5, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      attackValue = getRndomValue(8, 15);
      this.playerHealth -= attackValue;
    },
  },

  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
  },
});

app.mount("#game");
