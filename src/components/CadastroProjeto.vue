<template>
    <div class="modal" :class="{ 'is-active': show }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro do Projeto</p>
                    <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <form @submit.prevent="salvar" v-if="projetoEditar">
                    <section class="modal-card-body">
                        <div class="field">
                                <label class="label">Nome:</label>
                                <input type="text" v-model="projetoEditar.nome" class="input" required autofocus/>
                        </div>
                        <div class="field">
                                <label class="label">Área:</label>
                                <input type="text" v-model.number="projetoEditar.area" class="input" required/>
                        </div>
                        <div class="field">
                                <label class="label">Prazo:</label>
                                <input type="number" v-model.number="projetoEditar.prazo" class="input" required/>
                        </div>                    
                        <div class="field">
                                <label class="label">Orçamento:</label>
                                <input type="number" v-model.number="projetoEditar.orcamento" class="input" required maxlength="1000000" minlength="5000"/>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <input type="submit" class="button is-success" value="Salvar"/>
                        <button class="button" @click="$emit('close')">Cancelar</button>
                    </footer>
            </form>
        </div>     
    </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {
     axios
  },     
    props: {
        show: Boolean,
        projeto: Object,                              
    },  
    data() {
        return {
            projetoEditar: null
        }
    },
    mounted() {   
    },
    methods: {
        salvar() {
            this.$emit('save', this.projetoEditar)
        }
    },
    watch: {
        projeto: function(val) {
            this.projetoEditar = val
        } 
    }
}
</script>

<style>

</style>