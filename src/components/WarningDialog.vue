<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="400"
  >
    <v-card>
      <v-card-title>{{ message }}</v-card-title>
      <v-btn
      @click="dialogVisible = false"
      style="color: red; margin: 30px">Закрыть</v-btn>
      <v-card-text>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'WarningDialog',
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
