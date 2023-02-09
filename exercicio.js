// Reutilização de variavel para erro usando const dizendo que não é alterada
const qtdValidationError = "qtd deve ser um numeral!"
// validação externa de tipo com Arrow Function
const isNumber = (value) => typeof value === "number"

let elevatorOperator = {
  // Utilização propriedades do obj
  buildingHeight: 8,
  weightCapacity: 300,
  peopleCapacity: 5,
  floor: 0,
  people: [],
  //methodos do objeto
  canJoin: function(person) { // verifica se pode entrar certa pessoa no elevador
    if (this.people.length < this.peopleCapacity &&
      this.people.reduce((accumulator, curValue) => accumulator + curValue.weight, 0) + person.weight < this.weightCapacity) { // Utilização de prototypes
      return true
    }
    return false
  },
  advicePeopleToUnboarding: function() {
    for (var index = 0; index < this.people.length; index++) {
      if (this.people[index].stop === this.floor) {
				console.log(`Chegou no seu andar ${this.people[index].name}`)
      }
    }

  },
  unboardPeople: function() {
    this.advicePeopleToUnboarding()
    while (this.people.some(person => person.stop === this.floor)) {
        let personUnboardingIndex = this.people.findIndex(x => x.stop === this.floor)
        this.people.splice(personUnboardingIndex, 1)
    }
  },
  event: function(action, actionParams, callback) { // methodos usando callback
    try {
      switch (action) {
        case "up":
          if (!isNumber(actionParams.qtd)) {
            throw new Error(qtdValidationError)
          } else if (this.floor + actionParams.qtd > this.buildingHeight - 1) {
            throw new Error(`Elevador não pode ultrapassar a altura do prédio ${this.buildingHeight}`)
          } else {
            this.floor = this.floor + actionParams.qtd
            this.unboardPeople()
            callback(this)
          }
          break;
        case "down":
          if (!isNumber(actionParams.qtd)) {
            throw new Error(qtdValidationError)
          } else if (this.floor - actionParams.qtd < 0) {
            throw new Error(`Elevador não pode ultrapassar a altura minima do prédio 0`)
          } else {
            this.floor = this.floor - actionParams.qtd
            this.unboardPeople()
            callback(this)
          }
          break;
        case "peopleJoining":
          for (let counter = 0; counter < actionParams.people.length; counter++) { // utilização de Loop For
            if (this.canJoin(actionParams.people[counter])) {
              this.people.push(actionParams.people[counter])
            }
          }
          callback(this)
          break;
        default:
          throw new Error(`elevador não pode realizar a ação ${action}`)
      }
    } catch (error) { // utilização de TryCatch
      console.log(error)
    }
  }
}

elevatorOperator.event("peopleJoining", {
  people: [{
  	name:"Rodrigo",
    weight: 50,
    stop: 4
  }, {
  	name:"Bruno",
    weight: 100,
    stop: 7
  }]
}, (value) => console.log(value.people))

elevatorOperator.event("up", {
  qtd: 7
}, (value) => console.log(value.people))

elevatorOperator.event("peopleJoining", {
  people: [{
  	name:"lucas",
    weight: 100,
    stop: 4
  }, {
  	name:"Jorge",
    weight: 110,
    stop: 0
  },
  {
  	name:"leticia",
    weight: 30,
    stop: 0
  }]
}, (value) => console.log(value.people))

elevatorOperator.event("down", {
  qtd: 3
}, (value) => console.log(value.people))

elevatorOperator.event("down", {
    qtd: 4
  }, (value) => console.log(value.people))