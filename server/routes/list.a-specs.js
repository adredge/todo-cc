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
        expect(createdList.name).to.equal('Default')
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

    context('When creating two lists for a user', () => {
      let list1, list2, updatedList1, updatedList2
      const list1Name = "Work"
      const list2Name = "Personal"
      const workItem1 = "Go to meeting"
      const workItem2 = "Go to another meeting"
      const personalItem1 = "Have fun"

      beforeEach(() => {
        return apiPost(userId, 'createList', { name: list1Name })
          .then(list => list1 = list)
          .then(apiPost(userId, 'createList', { name: list2Name })
            .then(list => list2 = list))
          .then(() => apiPost(userId, 'addItem', { listId: list1._id, newItemName: workItem1 }))
          .then(() => apiPost(userId, 'addItem', { listId: list1._id, newItemName: workItem2 }))
          .then(() => apiPost(userId, 'addItem', { listId: list2._id, newItemName: personalItem1 }))
          .then(() => apiGet(userId, `list/${list1._id}`)
          .then(list => updatedList1 = list))
          .then(() => apiGet(userId, `list/${list2._id}`)
          .then(list => updatedList2 = list))
      })

      afterEach(() => {
        return apiDelete(userId, `deleteList/${list1._id}`)
          .then(() => apiDelete(userId, `deleteList/${list2._id}`))
      })

      it('should create the first list', () => {
        expect(list1.name).to.equal(list1Name)
      })

      it('should create the second list', () => {
        expect(list2.name).to.equal(list2Name)
      })

      it('should save the items', () => {
        expect(updatedList1.items[0].name).to.equal(workItem1)
        expect(updatedList1.items[1].name).to.equal(workItem2)
        expect(updatedList2.items[0].name).to.equal(personalItem1)
      })

      context('when getting the users lists', () => {
        let userLists 

        beforeEach(() => {
          return apiGet(userId, 'lists')
          .then(l => userLists = l)
        })

        it('should include both lists', () => {
          expect(userLists.userId).to.eql(userId)
          expect(userLists.lists.length).to.equal(2)
          expect(userLists.lists[0]._id).to.eql(list1._id)
          expect(userLists.lists[0].name).to.eql(list1Name)
          expect(userLists.lists[1]._id).to.eql(list2._id)
          expect(userLists.lists[1].name).to.eql(list2Name)
        })
      })
    })
  })
})