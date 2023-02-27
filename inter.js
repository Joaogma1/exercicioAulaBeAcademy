// Função contrutora
function Pessoa(nome, sobrenome, idade) {
   this.nome = nome;
   this.sobrenome = sobrenome;
   this.idade = idade;
}

//var <- Evita a todo custo, let e const
//  const pessoa = new Pessoa("João Gabriel", "Mauricio", 23);

const pessoa = {
   nome: "Augusto",
   sobrenome: "Rickes",
   idade: 25,
   imprimirDados: function () {
      console.log(`Meu nome é ${this.nome} ${this.sobrenome}, tenho ${this.idade}`);
   },
};

const estudante = {
   instituicao: "BE Academy",
   numeroDeMatricula: 1234,
};

Object.setPrototypeOf(estudante, pessoa);

const array = ["idade", "nome", "sobrenome", "Otavio", "Alzevir"];

const array2 = ["bianca, augusto"];

/// class <- Classe em inglês

class Faca {
   constructor(tamanho, material) {
      this.tamanho = tamanho;
      this.material = material;
      this.teste = "";
   }
   cortar(item) {
      if (item.toLowerCase() === "concreto") {
         console.log("A faca quebrou");
      } else {
         console.log(`${item} foi cortado`);
      }
   }
}

class Hardware {
   ligado;
   placamae;
   memoriaRam;
   hDD;
   constructor(placamae, memoriaRam, hDD) {
      this.ligado = false;
      this.memoriaRam = memoriaRam;
      this.placamae = placamae;
      this.hDD = hDD;
   }
   ligar() {
      this.ligado = true;
   }
   desligar() {
      this.ligado = false;
   }
}

class Pc extends Hardware {
   cor;
   constructor(cor, placamae, memoriaRam, hDD) {
      super(placamae, memoriaRam, hDD);
      this.cor = cor;
   }
   setColor(newColor) {
      if (typeof newColor === "string") {
         this.cor = newColor;
      } else {
         throw new Error("NewColor não é do tipo string");
      }
   }
}

let computador = new Pc("Preto", "Asus", 16, 1000);
computador.cor = 20;

computador.ligar();

class Notebook extends Hardware {}

let macbook = new Notebook("Apple", 8, 256);

const ehNumero = (valor) => valor === "number";

// Comparar dois valores de forma asyncrona
const ehMaiorQue = async (valor, valorComparado) => {
   return new Promise((resolve, reject) => {
      try {
         if (!ehNumero(valor) || !ehNumero(valorComparado)) throw new Error("os valores de input devem ser do tipo numeral");
         resolve(valorComparado > valor);
      } catch (error) {
         reject(error);
      }
   });
};

async function somaPar(v1, v2) {
   return new Promise(async (resolve, reject) => {
      try {
         if (!ehNumero(v1) || !ehNumero(v2)) throw new Error("os valores de input devem ser do tipo numeral");
         try {
            const result = await ehMaiorQue(v1, v2);
            if (result === false) throw new Error("primeiro valor é inferior ao segundo");
            resolve(v1 + (v2 % 2) === 0 ? true : false);
         } catch (error) {
            reject(error);
         }
      } catch (error) {
         reject(error);
      }
   });
}

function qualquerCoisa(v1, v2) {
   const promise1 = somaPar(v1, v2);
   const promise2 = somaPar(v2, v1);

   Promise.all([promise1, promise2]).then((values) => {});
}

function methodoSync() {
   let variavel = null;
   somaPar(6, 3)
      .then((value) => {
         variavel = value;
      })
      .catch((error) => console.log(error))
      .finally(() => {
         console.log("Enviar telemetria que a requisição foi relizada");
      });
}

const [primeiro, segundo, terceiro, ...rest] = array;

const arrayNovo = [...rest, "Pedro"];

const meuSetup = new Pc("Preto", "HMB512", 12, 500);

const { cor, ligado, hDD } = meuSetup;

function construirPC({ cor = "Preto", ...rest }) {
   // console.log(cor);
}

construirPC({ placamae: "qualquer", hDD: 0, memoriaRam: 8 });

const array3 = ["bianca", "augusto", "Deborah", "Alzevir", "Recursividade"];

const printarNomes = (listaDeNomes, index = 0) => {
   console.log(listaDeNomes[index]);
   if (index < listaDeNomes.length - 1) {
      printarNomes(listaDeNomes, index + 1);
   }
};

// printarNomes(array3);
// const fetch = require("node:fetch");

// const ListarPokemon = () => {
//    const requisitarDoServidor = async () => {
//       fetch("https://pokeapi.co/api/v2/")
//          .then((res) => res.json())
//          .then((resp) => console.log(resp));
//    };
//    return requisitarDoServidor();
// };
// // return result.json();

// ListarPokemon();

// program to display fibonacci sequence using recursion
function fibonacci(num) {
   if (num < 2) {
      return num;
   } else {
      return fibonacci(num - 1) + fibonacci(num - 2);
   }
}

for (let index = 0; index < 18; index++) {
   console.log(fibonacci(index));
}
