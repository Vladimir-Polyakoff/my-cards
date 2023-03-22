import { dataBase } from './dataBase'

export default {
  getCards: () => ({
    status: 'success',
    cards: dataBase.getCards() || []
  }),
  getCard: id => dataBase.getCard(id),
  createCard: card => ({
    status: dataBase.createCard(card) ? 'success' : 'error'
  }),
  editCard: card => ({
    status: dataBase.updateCard(card) ? 'success' : 'error'
  }),
  deleteCard: id => ({
    status: dataBase.deleteCard(id) ? 'success' : 'error'
  }),
  reg: data => ({
    status: dataBase.reg(data) ? 'success' : 'error'
  }),
  auth: data => ({
    status: dataBase.auth(data) ? 'success' : 'error'
  })
}
