function getRndomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },

  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRndomValue(5, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRndomValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      this.currentRound <= 3;
      const attackValue = getRndomValue(10, 25);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healVaule = getRndomValue(8, 20);
      if (this.playerHealth + healVaule > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healVaule;
      }
      this.attackPlayer();
    },
    restartGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    surrender() {
      this.winner = "monster";
      // THIS ALSO WORKS:
      //   this.playerHealth = 0;
    },
  },

  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return {
        width: this.monsterHealth + "%",
      };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return {
        width: this.playerHealth + "%",
      };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // a draw
        this.winner = "draw";
        this.playerHealth = 0;
      } else if (value <= 0) {
        // player lost
        this.winner = "monster";
        this.playerHealth = 0;
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // a draw
        this.winner = "draw";
        this.monsterHealth = 0;
      } else if (value <= 0) {
        // monster lost
        this.winner = "player";
        this.monsterHealth = 0;
      }
    },
    winner(value) {
      if (value === "draw") {
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.winner = null;
      }
    },
  },
});

app.mount("#game");
