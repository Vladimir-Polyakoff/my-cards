<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="400"
  >
    <v-card>
      <v-card-title>{{ message }}</v-card-title>
      <div style="margin: 30px; dispaly: flex; justify-content: flex-end">
        <v-btn
        @click="() => { $emit('confirm'), dialogVisible = false }"
        style="color: green;">Подтвердить</v-btn>
        <v-btn
        @click="dialogVisible = false"
        style="color: red;">Отменить</v-btn>
      </div>
      <v-card-text>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  data: () => ({
    dialogVisible: false,
    message: ''
  }),
  methods: {
    openDialog (message) {
      this.dialogVisible = true
      this.message = message
    }
  }
}
</script>
