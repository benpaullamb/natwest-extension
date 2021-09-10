<template>
  <div>
    <header class="header">
      <img class="header__logo" :src="natWestLogo" alt="NatWest logo" />
      <h1 class="header__title">Login Utility</h1>
    </header>

    <main class="main">
      <div class="main__group">
        <label for="pin" class="main__label">PIN</label>
        <input v-model="pin" id="pin" type="password" class="main__input" />
      </div>
      <div class="main__group">
        <label for="password" class="main__label">Password</label>
        <input v-model="password" @keydown.enter="submit" id="password" type="password" class="main__input" />
      </div>

      <button @click="submit" id="submit" class="main__submit">Insert</button>
    </main>
  </div>
</template>

<script>
import NatWestLogo from './assets/natwest-logo.svg';

export default {
  data() {
    return {
      pin: '',
      password: '',
      natWestLogo: NatWestLogo,
    };
  },
  mounted() {
    chrome.runtime.onMessage.addListener((req) => {
      if (req.message === 'close') {
        window.close();
      }
    });
  },
  methods: {
    submit() {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          pin: this.pin,
          password: this.password,
        });
      });
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: sans-serif;
}

header {
  padding: 1rem;
  display: flex;
  align-items: center;
  background: #42145f;
}

.header__logo {
  max-height: 36px;
  margin-right: 1rem;
}

.header__title {
  color: white;
  font-size: 24px;
}

.main {
  padding: 1rem;
}

.main__group {
  margin-bottom: 1rem;
}

.main__label {
  margin-bottom: 0.5rem;
  display: block;
  font-size: 20px;
}

.main__input {
  padding: 0.5rem;
  display: block;
  font-size: 16px;
}

.main__submit {
  min-width: 4rem;
  padding: 0.5rem 1rem;
  background: #b12f8b;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
}
</style>
