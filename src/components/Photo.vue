<template>
  <v-col cols="4">
    <v-card @click="openCard">
      <v-card-title>{{ card.title }}</v-card-title>
      <v-card-text>
        <v-img
          width="200"
          height="200"
          :src="card.url"
        />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'ThePhoto',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    openCard () {
      this.$emit('openCard', this.card)
    }
  }
}
</script>
