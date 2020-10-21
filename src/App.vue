<template>
  <div>
    <dashboard-projetos :projetos="projetos"> </dashboard-projetos> 
    <button class="button is-primary" @click="adicionar">Adicionar Projeto</button>
    <button class="button is-primary" @click="inserirTeste">Teste</button>
    </br>
    <h2>5 Projetos mais caros </h2>
    <table class="table is-bordered">
        <thead>
          <tr>
              <th>ID</th>
              <th>Projeto</th>
              <th>Área</th>
              <th>Prazo</th>
              <th class="has-text-right">Orçamento</th>
              <th></th>
              </tr>
        </thead>
        <tbody>
          <tr v-for="p in cincoProjetosMaisCaros" :key="p.id">
              <td> {{p.id}} </td>
              <td> {{p.nome}} </td>
              <td> {{p.area}} </td>
              <td> {{p.prazo}} </td>
              <td class="has-text-right"> {{ formatNumber(p.orcamento) }}</td>
              <td>
                  <button class="button" @click="editar(p)">Editar</button>
                  <button class="button" @click="excluir(p)">Excluir</button>
              </td>
          </tr>
        </tbody>
    </table>  
    <cadastro-projeto :show="showForm" :projeto="projetoEditar" @close="close" @save="salvar" > </cadastro-projeto>   
      <h2>Orçamento Total: {{ formatNumber(calculaOcamentoTotal()) }} </h2>      
  </div>
</template>

<script>
import DashboardProjetos from "./components/DashboardProjetos"
import CadastroProjeto from "./components/CadastroProjeto"
import FormatNumber from "./components/mixins/FormatNumber"
import axios from 'axios'
export default { 
  mixins: [FormatNumber],  
  components: {
    CadastroProjeto, DashboardProjetos, axios
  },  
  name: 'app',
  data () {
    return {
      projetos: [],
      filtro:"",
      projetoEditar: null,
      showForm: false,
    }
  },
  mounted () {
        axios.get('https://projeto-prova.herokuapp.com/projeto'). then ( response => {
                    this.projetos = response.data        
        });      
  },  
  methods: {     
    close() {
       this.showForm = false;
    },    
    adicionar() {
        this.projetoEditar = {
            id: null,
            nome: '',
            area: '',
            prozo: null,
            orcamento: null,
        },
        this.showForm = true;
    },  

    inserir (projeto) {
        let projetoAdicionar = Object.assign({}, projeto);
        axios.post('https://projeto-prova.herokuapp.com/projeto' , projetoAdicionar). then 
                          ( response => {
                                projetoAdicionar.id = response.data
                                this.projetos.push ( projetoAdicionar )
                          }). catch ( error => {
                                alert ( 'Erro ao adicionar o projeto' )
                                console . log ( error )
                          })
    },

    inserirTeste () {
        let projetoAdicionar = {nome:"Projeto11", area:"MEDICA", prazo: 45, orcamento: 6000};

        axios.post('https://projeto-prova.herokuapp.com/projeto' , projetoAdicionar). then 
                          ( response => {
                                projetoAdicionar.id = response.data
                                this.projetos.push ( projetoAdicionar )
                          }). catch ( error => {
                                alert ( 'Erro ao adicionar o projeto' )
                                console . log ( error )
                          })
    },


    alterar (projeto) {
        let idx = this.projetos.findIndex(c => {
            return c.id == projeto.id;
        });
        if (idx > -1) {
            axios.post('https://projeto-prova.herokuapp.com/projeto' , projeto). then 
                          ( response => {
                                projeto.id = response.data;
                                this.projetos[idx] = projeto;
                                this.$set(this.projetos, idx, this.projetos[idx]);
                          }). catch ( error => {
                                alert ( 'Erro ao alterar o projeto' )
                                console . log ( error )
                          })            
        }
    },

    editar(projeto) {
        this.projetoEditar = Object.assign({}, projeto);
        axios.get ('https://projeto-prova.herokuapp.com/projeto/' + projeto.id ). then ( response => {
              this.projetoEditar = response.data
              this.showForm = true
        })   
    },

    excluir(projeto) {
        if (confirm("Excluir registro?")) {      
            axios.delete('https://projeto-prova.herokuapp.com/projeto/' + projeto.id). then ( response => {
                    this.projetos.splice ( this.projetos.indexOf (projeto), 1 )
            }). catch ( error => {
                  alert ( 'Erro na exclusão do projeto' )
                  console.log ( error )
            })
        }
    },

    salvar(projeto) {
        if (this.showForm) {
            if (projeto.id == null) {
                this.inserir(projeto);
            }
            else
            {
                this.alterar(projeto);
            }
            this.showForm = false;
        }        
    }, 

    calculaOcamentoTotal() {
      let total = 0;
      this.projetos.forEach(element => {
            total = total + element.orcamento;                               
      });
      return total;
    }

  },

  computed: {
    cincoProjetosMaisCaros: function() {
          /* ordena decrescente pelo orçamento */
          let lista =  this.projetos.sort(function( a, b ){
                  return parseInt( a.orcamento ) < parseInt( b.orcamento ) ? 1 : -1;
          }.bind(this));

          let max = 5;
          let i = 1;
          let novaLista = [];
          this.projetos.forEach(element => {
                if (i <= max) {
                    novaLista.push(element);
                }
                i = i + 1;                               
          });
          
          return novaLista;
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
