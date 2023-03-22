<template>
  <v-container>
    <CardForm ref="CardForm"
    @addCard="addCard"
    @setWarning="message => $refs.WarningDialog.openDialog(message)"
    @updateCard="updateCard"
    @filterCards="filterCards"
    ></CardForm>
    <v-row>
      <!-- :obj="photo" @changeTitle="changeTitlePar" -->

      <Photo v-for="card in filteredCards"
        :key="card.id"
        :card="card"
        @openCard="openCard">
      </Photo>
    </v-row>

    <CardDialog ref="CardDialog"
      :dialogVisible="cardDialogVisible"
      @deleteCard="deleteCard"
      @editCard="card => $refs.CardForm.setEditingCard(card)"
      @openConfirmDialog="message => $refs['ConfirmDialog'].openDialog(message)"
    ></CardDialog>
    <WarningDialog ref="WarningDialog"></WarningDialog>
  </v-container>
</template>

<script>
import Photo from '@/components/Photo.vue'
import CardForm from '@/components/CardForm.vue'
import CardDialog from '@/components/CardDialog.vue'
import WarningDialog from '@/components/WarningDialog.vue'

import server from '@/server/server.js'

export default {
  components: {
    Photo,
    CardForm,
    CardDialog,
    WarningDialog
  },
  data: () => ({
    cards: [],
    currentCard: {},
    dialogVisible: false,
    cardDialogVisible: false,
    filteredCards: []
  }),
  created () {
    this.getCards()
  },
  mounted () {
    // this.fetchTodo()
  },
  methods: {
    // searchCard (later) {
    //   this.cards.filter(card => card.title === later)
    //   this.searchCards.push(this.cards)
    //   return this.searchCards
    // },
    getCards () {
      const response = server.getCards()

      if (response.status === 'success') {
        this.cards = response.cards
        this.filteredCards = response.cards
      }
    },
    filterCards (value) {
      if (!value) {
        this.filteredCards = this.cards
        return
      }

      this.filteredCards = []
      this.cards.forEach(card => card.title.includes(value) && this.filteredCards.push(card))
    },
    addCard (card) {
      const response = server.createCard(card)

      if (response.status === 'success') {
        this.cards.push(card)
        this.$refs.CardForm.resetCard()
      }
    },
    openCard (card) {
      this.cardDialogVisible = true
      this.$refs.CardDialog.openDialog(card)
    },
    deleteCard (id) {
      const response = server.deleteCard(id)

      if (response.status === 'success') {
        this.cards = this.cards.filter(card => card.id !== id)
        this.cardDialogVisible = false
      } else {
        this.$refs.WarningDialog.openDialog('Ошибка при удалении карточки')
      }
    },
    updateCard (editedCard) {
      const response = server.editCard(editedCard)
      if (response.status === 'success') {
        this.$refs.CardForm.resetCard()
        this.cards = this.cards.map(card => {
          if (card.id === editedCard.id) {
            card = editedCard
          }
          return card
        })
      } else {
        this.$refs.WarningDialog.openDialog('Ошибка при редактировании карточки')
      }
    }
  }
}
</script>
