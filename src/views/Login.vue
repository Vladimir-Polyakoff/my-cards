<template>
  <div class="login">
    <v-card class="card">
      <v-card-title>{{ title }}</v-card-title>
      <v-form ref="Form">
        <v-text-field counter :rules="[ loginRules.required, loginRules.minLength, loginRules.maxLength ]"
        v-model="login"
        label="login">
        </v-text-field>
        <v-text-field counter :rules="[ passwordRules.required, passwordRules.length]"
        v-model="password"
        label="password">
        </v-text-field>
      </v-form>
      <div class="actions">
        <v-btn class="btn" @click="submit">Вход</v-btn>
        <div class="link" @click="toggleLogin">{{ titleToggleLogin }}</div>
      </div>
        {{ error }}
    </v-card>
  </div>
</template>

<script>
import server from '@/server/server'

export default {
  name: 'TheLogin',

  data () {
    return {
      login: '',
      password: '',
      mode: 'reg',
      loginRules: {
        required: value => Boolean(value) || 'Введите login',
        minLength: value => value.length > 2 || 'минимум 3 символа',
        maxLength: value => value.length <= 8 || 'максимуи 8 символов'
      },
      passwordRules: {
        required: value => Boolean(value) || 'Введите password',
        length: value => value.length === 8 || 'пароль должен содержать 8 символов'
      },
      error: ''
    }
  },
  computed: {
    titleToggleLogin () {
      return this.mode === 'reg' ? 'авторизоваться' : 'зарегистрироваться'
    },
    title () {
      return this.mode === 'reg' ? 'Регистрация' : 'Авторизация'
    }
  },
  methods: {
    toggleLogin () {
      this.mode === 'reg' ? this.mode = 'auth' : this.mode = 'reg'
      this.error = ''
    },
    submit () {
      if (!this.$refs.Form.validate()) {
        return
      }
      const data = {
        login: this.login,
        password: this.password
      }
      this.mode === 'reg' ? this.reg(data) : this.auth(data)
    },
    auth (data) {
      const response = server.auth(data)

      if (response.status === 'success') {
        this.$router.push({ name: 'PhotoPage' })
      } else if (response.status === 'error') {
        this.error = 'неправильный логин или пароль'
      }
    },
    reg (data) {
      const response = server.reg(data)

      if (response.status === 'success') {
        this.$router.push({ name: 'PhotoPage' })
      } else if (response.status === 'error') {
        this.error = 'ошибка при регистрации'
      }
    }
  }
}
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .login {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(196, 196, 196);
  }
  .link {
    color: blue;
    font-size: 16px;
    display: inline-block;
    margin-left: 30px;
    cursor: pointer;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-top: 24px;
  }
</style>
