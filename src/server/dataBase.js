const parseList = list => JSON.parse(list)
const isDataLength = data => Boolean(data && data.length)
const checkCards = (id, data) => {
  for (const card of data) {
    if (card.id === id) {
      return true
    }
  }
  return false
}

export const dataBase = {
  getCards: () => {
    return parseList(localStorage.getItem('cardsList'))
  },
  deleteCards: () => {
    localStorage.setItem('cardsList', '')
  },
  saveCards: cardsList => {
    localStorage.setItem('cardsList', JSON.stringify(cardsList))
  },
  getCard: id => {
    const cardsList = dataBase.getCards()
    const card = cardsList.find(card => card.id === id)

    return !card
      ? { status: 'error' }
      : { status: 'success', card }
  },
  createCard: card => {
    const cardsList = dataBase.getCards()

    if (isDataLength(cardsList)) {
      cardsList.unshift(card)
      dataBase.saveCards(cardsList)
    } else {
      dataBase.saveCards([card])
    }

    return checkCards(card.id, dataBase.getCards())
  },
  updateCard: updatedCard => {
    const cardsList = dataBase.getCards()
    console.log('cardBefore', cardsList)
    for (let i = 0; i < cardsList.length; ++i) {
      if (updatedCard.id === cardsList[i].id) {
        cardsList[i] = updatedCard
        dataBase.saveCards(cardsList)
        return true
      }
    }
    return false
  },
  deleteCard: id => {
    const cardsList = dataBase.getCards()
    const updatedCardsList = cardsList.filter(card => card.id !== id)
    dataBase.saveCards(updatedCardsList)

    return cardsList.length > updatedCardsList.length
  },
  getUsers: () => {
    return parseList(localStorage.getItem('usersList'))
  },
  saveUsers: usersList => {
    localStorage.setItem('usersList', JSON.stringify(usersList))
  },
  reg: data => {
    const usersList = dataBase.getUsers()

    usersList.unshift(data)
    dataBase.saveUsers(usersList)
    return true
  },
  auth: data => {
    const usersList = dataBase.getUsers()
    let flag = false

    for (const user of usersList) {
      if (user.login === data.login) {
        if (user.password === data.password) {
          flag = true
        }
      }
    }
    return flag
  }
}
