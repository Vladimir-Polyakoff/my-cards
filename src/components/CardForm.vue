<template>
  <v-container>
    <v-row class="d-flex">
      <v-text-field @input="$emit('filterCards', search)" placeholder="поиск по названию" v-model.trim="search"></v-text-field>
      <v-text-field placeholder="Введите название карточки" v-model.trim="title"></v-text-field>
      <v-file-input :placeholder="editingCard?.fileName || 'Выберите фото'"
      v-model="img"></v-file-input>
      <v-btn @click="editingCard ? editCard() : addCard()">{{ buttonTitle }}</v-btn>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'CardForm',
  data: () => ({
    title: '',
    img: null,
    editingCard: null,
    search: ''
  }),
  computed: {
    buttonTitle () {
      return this.editingCard ? 'Редактировать' : 'Добавить'
    }
    // imagePlaceholder () {
    //   return this.editingCard.fileName || 'Выберите фото'
    // }
  },
  methods: {
    addCard () {
      if (!this.validCard()) {
        this.$emit('setWarning', 'Необходимо заполнить поля')
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        const card = {
          id: Date.now(),
          title: this.title,
          url: reader.result,
          fileName: this.img.name
        }
        this.$emit('addCard', card)
      }
      reader.readAsDataURL(this.img)
    },
    resetCard () {
      this.title = ''
      this.img = null
      this.editingCard = null
    },
    setEditingCard (card) {
      console.log(card)
      this.editingCard = card
      this.title = card.title
      // this.img = this.getImageTitleByUrl(card.url)
      // this.editingImage = this.getImageTitleByUrl(card.url)
    },
    // getImageTitleByUrl (url) {
    //   const typeImage = url.split(';base64,/')[0].split('/')[1]
    //   const titleImage = url.split(';base64,/')[1].split('/')[0]
    //   return `${titleImage}.${typeImage}`
    // },
    validCard () {
      console.log(this.img)
      console.log(this.title)
      return this.img && this.title
    },
    editCard () {
      if (!this.title) {
        this.$emit('setWarning', 'Необходимо заполнить название')
        return
      }

      if (!this.img && this.title === this.editingCard.title) {
        this.$emit('setWarning', 'Карточка не редактированна')
      } else if (this.title !== this.editingCard.title && !this.img) {
        this.$emit('updateCard', { ...this.editingCard, title: this.title })
      } else {
        const reader = new FileReader()
        reader.onload = () => {
          const editedCard = {
            id: this.editingCard.id,
            title: this.title,
            url: reader.result,
            fileName: this.img.name
          }
          this.$emit('updateCard', editedCard)
        }
        reader.readAsDataURL(this.img)
      }
    }
  }
}
</script>
