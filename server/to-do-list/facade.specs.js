'use strict'

const uuid = require('uuid')
const listTestData = require('../../test/test-data/list-test-data')
const itemTestData = require('../../test/test-data/item-test-data')

const toDoListFacade = require('./facade')
const toDoListRepository = require('./repository')

describe('to do list facade', () => {
  let userId

  beforeEach(() => {
    userId = uuid.v4()
  })

  describe('#getDefaultToDoList', () => {
    let actual, toDoList

    beforeEach(() => {
      toDoList = listTestData.build()

      td.replace(toDoListRepository, 'getList')
      td.when(toDoListRepository.getList(td.matchers.anything())).thenResolve(toDoList)

      return toDoListFacade.getDefaultToDoList(userId).then(l => actual = l)
    })

    it('should call the to do list repository', () => {
      td.verify(toDoListRepository.getList(userId))
    })

    it('should return the list', () => {
      expect(actual).to.eql(toDoList)
    })
  })

  describe('#getDefaultToDoList', () => {
    let actual, toDoList
    const listId = uuid.v4()

    beforeEach(() => {
      toDoList = listTestData.build()

      td.replace(toDoListRepository, 'getList')
      td.when(toDoListRepository.getList(td.matchers.anything(), td.matchers.anything())).thenResolve(toDoList)

      return toDoListFacade.getList(userId, listId).then(l => actual = l)
    })

    it('should get the list from the repository', () => {
      td.verify(toDoListRepository.getList(userId, listId))
    })

    it('should return the list', () => {
      expect(actual).to.eql(toDoList)
    })
  })

  describe('#createList', () => {
    context('when creating a list without a name', () => {
      let actual, toDoList

      beforeEach(() => {
        toDoList = listTestData.buildEmpty()

        td.replace(toDoListRepository, 'createEmptyList')
        td.when(toDoListRepository.createEmptyList(td.matchers.anything(), td.matchers.anything())).thenResolve(toDoList)

        return toDoListFacade.createList(userId).then(l => actual = l)
      })

      it('should call the repository with the userId and a default name', () => {
        td.verify(toDoListRepository.createEmptyList(userId, 'Default'))
      })

      it('should return the list', () => {
        expect(actual).to.eql(toDoList)
      })
    })

    context('when creating a list with a name', () => {
      let actual, toDoList
      const listName = "This is a to do list"

      beforeEach(() => {
        toDoList = listTestData.buildEmpty()

        td.replace(toDoListRepository, 'createEmptyList')
        td.when(toDoListRepository.createEmptyList(td.matchers.anything(), td.matchers.anything())).thenResolve(toDoList)

        return toDoListFacade.createList(userId, listName).then(l => actual = l)
      })

      it('should call the repository with the userId and name', () => {
        td.verify(toDoListRepository.createEmptyList(userId, listName))
      })

      it('should return the list', () => {
        expect(actual).to.eql(toDoList)
      })
    })
  })

  describe('#checkItem', () => {
    let actual, toDoItem
    const itemId = uuid.v4()
    const completedAt = new Date().toLocaleString()

    beforeEach(() => {
      toDoItem = itemTestData.build()

      td.replace(toDoListRepository, 'checkItem')
      td.when(toDoListRepository.checkItem(td.matchers.anything(), td.matchers.anything())).thenResolve(toDoItem)

      return toDoListFacade.checkItem(itemId, completedAt).then(l => actual = l)
    })

    it('should call the to do list repository', () => {
      td.verify(toDoListRepository.checkItem(itemId, completedAt))
    })

    it('should return the item from the repository', () => {
      expect(actual).to.eql(toDoItem)
    })
  })

  describe('#uncheckItem', () => {
    let actual, toDoItem
    const itemId = uuid.v4()

    beforeEach(() => {
      toDoItem = itemTestData.build()

      td.replace(toDoListRepository, 'uncheckItem')
      td.when(toDoListRepository.uncheckItem(td.matchers.anything())).thenResolve(toDoItem)

      return toDoListFacade.uncheckItem(itemId).then(l => actual = l)
    })

    it('should call the to do list repository', () => {
      td.verify(toDoListRepository.uncheckItem(itemId))
    })

    it('should return the item from the repository', () => {
      expect(actual).to.eql(toDoItem)
    })
  })

  describe('#addItem', () => {
    let actual, toDoList, listId
    const newItemName = "New Test Item"

    beforeEach(() => {
      toDoList = listTestData.build()

      listId = toDoList._id
      const itemDetails = { listId, newItemName }

      td.replace(toDoListRepository, 'addItem')
      td.when(toDoListRepository.addItem(td.matchers.anything(), td.matchers.anything(), td.matchers.anything())).thenResolve(toDoList)

      return toDoListFacade.addItem(userId, itemDetails).then(l => actual = l)
    })

    it('should call the to do list repository', () => {
      td.verify(toDoListRepository.addItem(userId, listId, newItemName))
    })

    it('should return the item from the repository', () => {
      expect(actual).to.eql(toDoList)
    })
  })

  describe('#removeItem', () => {
    let actual, toDoList, listId, itemId

    beforeEach(() => {
      toDoList = listTestData.build()

      listId = toDoList._id
      itemId = toDoList.items[0]._id

      td.replace(toDoListRepository, 'removeItem')
      td.when(toDoListRepository.removeItem(td.matchers.anything(), td.matchers.anything(), td.matchers.anything())).thenResolve(toDoList)

      return toDoListFacade.removeItem(userId, listId, itemId).then(l => actual = l)
    })

    it('should call the to do list repository', () => {
      td.verify(toDoListRepository.removeItem(userId, listId, itemId))
    })

    it('should return the item from the repository', () => {
      expect(actual).to.eql(toDoList)
    })
  })

  describe('#getListsForUser', () => {
    let actual
    const expected = {
      userId,
      lists: [
        { _id: uuid.v4(), name: "List 1" },
        { _id: uuid.v4(), name: "List 2" }
      ]
    }

    beforeEach(() => {
      td.replace(toDoListRepository, 'getListsForUser')
      td.when(toDoListRepository.getListsForUser(td.matchers.anything())).thenResolve(expected)

      return toDoListFacade.getListsForUser(userId).then(l => actual = l)
    })

    it('should gets the users lists from the repository', () => {
      td.verify(toDoListRepository.getListsForUser(userId))
    })

    it('should return the lists from the repository', () => {
      expect(actual).to.eql(expected)
    })
  })
})