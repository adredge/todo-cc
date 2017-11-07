"use strict"

const { apiGet, apiPost, apiDelete } = require('../../test/acceptance-specs-helper')
const uuid = require('uuid')

describe('/api', () => {
  let userId
  before(() => userId = uuid.v4())

  describe('/list ', function () {
    context('When the user does NOT have a list', () => {
      let actual
      beforeEach(() => {
        return apiGet(userId, 'list').then(data => actual = data)
      })

      it('should return a null list', () => {
        expect(actual).to.be.null
      })
    })

    context('When creating a new list and adding items to it', () => {
      let createdList
      const item1Name = "Go to bed"
      const item2Name = "Wake up"

      beforeEach(() => {
        return apiPost(userId, 'createList')
          .then(() => apiGet(userId, 'list')
            .then(list => {
              createdList = list
              apiPost(userId, 'addItem', { listId: createdList._id, newItemName: item1Name })
            })
            .then(() => apiPost(userId, 'addItem', { listId: createdList._id, newItemName: item2Name })))
      })

      afterEach(() => {
        return apiDelete(userId, `deleteList/${createdList._id}`)
      })

      it('should create a new list', () => {
        expect(createdList.name).to.equal("Default")
        expect(createdList.userId).to.equal(userId)
        expect(createdList._id).to.exist
      })
    })

    context('When adding to and removing from a list', () => {
      let listId, list, itemId
      const item1Name = "Buy some food"
      const item2Name = "Make dinner"
      beforeEach(() => {
        return apiPost(userId, 'createList')
          .then(() => apiGet(userId, 'list'))
          .then(l => listId = l._id)
          .then(() => apiPost(userId, 'addItem', { listId: listId, newItemName: item1Name }))
          .then(l => itemId = l.items[0]._id)
          .then(() => apiPost(userId, 'addItem', { listId, newItemName: item2Name }))
          .then(() => apiDelete(userId, `removeItem/${listId}/${itemId}`))
          .then(() => apiGet(userId, 'list'))
          .then(l => list = l)
      })

      afterEach(() => {
        return apiDelete(userId, `deleteList/${listId}`)
      })

      it('should still have the other item in the list', () => {
        expect(list.items.length).to.equal(1)
        expect(list.items[0].name).to.equal(item2Name)
      })
    })
  })
})