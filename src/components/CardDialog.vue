<template>
  <v-dialog
    v-model="visible"
    max-width="400"
  >
    <v-card>
      <v-card-title>{{ card.title }}</v-card-title>
      <v-btn
      @click="() => {$emit('editCard', card), visible = false}"
      style="color: gray; margin: 30px">Редактировать</v-btn>
      <v-btn @click="$refs['ConfirmDialog'].openDialog('Вы уверенны что хотитие удалить: ' + card.title)" style="color: red;">Удалить</v-btn>
      <v-card-text>
        <v-img
          :src="card.url"
        ></v-img>
      </v-card-text>
    </v-card>
    <ConfirmDialog ref="ConfirmDialog"
    @confirm="deleteCard(card.id)"></ConfirmDialog>

  </v-dialog>
</template>

<script>
import ConfirmDialog from '@/components/ConfirmDialog.vue'

export default {
  name: 'CardDialog',
  components: {
    ConfirmDialog
  },
  data () {
    return {
      visible: false,
      card: {}
    }
  },
  methods: {
    openDialog (card) {
      this.card = card
      this.visible = true
    },
    deleteCard (id) {
      this.visible = false
      setTimeout(() => this.$emit('deleteCard', id), 500)
    }
  }
}
</script>
