describe('template spec', () => {
  beforeEach ( () =>{
    cy.visit ('/')
  })

  it('download page', () => {
    cy.contains ("Books list").should('be.visible')
  })

  it ('valid login', () => {
    cy.login ("test@test.com","test")
    cy.contains ("Добро пожаловать test@test.com").should ("be.visible")
  })

  it ('null email', () => {
    cy.login (null, "test")
    cy.get('#mail').then ((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect (elements [0]. validationMessage).to.be.eql ("Заполните это поле.")
    })
    
  })

  it ('null password', () => {
    cy.login ("test@test.com", null)
    cy.get('#pass').then ((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect (elements [0]. validationMessage).to.be.eql ("Заполните это поле.")
    })
  })

describe('Book list', () => {
  beforeEach ( () =>{
    cy.login("test@test.com","test")
  })
  
  it('Add book', () => {
    cy.get('.p-0 > .btn').click()
    cy.get('#title').type ("Война и мир")
    cy.get('#description').type ("different text")
    cy.get('#authors').type ("Лев Толстой")
    cy.contains('Submit').click()
    cy.contains ("Война и мир").should ('be.visible')
  })

  it('Add an existing book', () => {
    cy.get('.p-0 > .btn').click()
    cy.get('#title').type ("Война и мир")
    cy.get('#description').type ("different text")
    cy.get('#authors').type ("Лев Толстой")
    cy.contains('Submit').click()
    cy.contains ("Война и мир").should ('be.visible')
    //не знаю как описать проверку, подразумевается ошибка "Книга уже есть в библиотеке"
  })

  describe ('Favorites', () => {

    it ("add favorite book", () => {
      cy.get('[href="book/6857e7b8-7912-463b-80c1-7d31b007fb8a"] > .h-100 > .card-footer > .btn').click()
      cy.visit ("http://localhost:3000/favorites")
      cy.contains ("Война и мир").should ("be.visible")
    })

    it ("delete favorite book", () => {
      cy.visit ("http://localhost:3000/favorites")
      cy.get('.card-footer > .btn').click ()
      cy.contains ("Please add some book to favorit on home page!").should ("be.visible")
    })
  })
})
})
