function getRndomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
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
  },

  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
});

app.mount("#game");
