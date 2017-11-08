'use strict'

const toDoListRepository = require('./repository')

module.exports = {
  getDefaultToDoList(userId) {
    return toDoListRepository.getList(userId)
  },

  getList(userId, listId) {
    return toDoListRepository.getList(userId, listId)
  },

  createList(userId, name) {
    let listName = name || 'Default'
    return toDoListRepository.createEmptyList(userId, listName)
  },

  checkItem(itemId, completedAt) {
    return toDoListRepository.checkItem(itemId, completedAt)
  },

  uncheckItem(itemId) {
    return toDoListRepository.uncheckItem(itemId)
  },

  addItem(userId, addItemDetails) {
    return toDoListRepository.addItem(userId, addItemDetails.listId, addItemDetails.newItemName)
  },

  removeItem(userId, listId, itemId) {
    return toDoListRepository.removeItem(userId, listId, itemId)
  },

  deleteList(userId, listId) {
    return toDoListRepository.deleteList(userId, listId)
  }
}