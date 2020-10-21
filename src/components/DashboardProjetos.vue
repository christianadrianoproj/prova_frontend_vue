<template>
    <div>
        <div class="principal">
            <div class="box"> 
                    {{ formatNumber(tecnologica) }}</br>
                   <h2>Tecnologia</h2>
            </div>
               <div class="box">
                   {{ formatNumber(humanas) }}</br>
                   <h2>Humanas</h2> 
               </div>
               <div class="box">
                  {{ formatNumber(medica) }}</br>
                   <h2>Médica</h2> 
              </div>
           </br>
        </div> 


    </div>
</template>

<script>
import FormatNumber from "./mixins/FormatNumber"
export default {
  mixins: [FormatNumber],     
    props: {
        projetos: {
            type: Array,
        },
    },
    data() {
        return {
            tecnologica: 0, 
            humanas: 0, 
            medica:0
        }
    },
    mounted() {
        this.calcularPercentuais()
    },
    methods: {
        calcularPercentuais() {
            this.tecnologica = 0;
            this.humanas = 0;
            this.medica = 0;

            this.projetos.forEach(element => {
                if ((element.area.startsWith("T")) || (element.area.startsWith("t"))) {
                  this.tecnologica  = this.tecnologica + 1    
                }
                if ((element.area.startsWith("H")) || (element.area.startsWith("h"))) {
                  this.humanas  = this.humanas + 1    
                }
                if ((element.area.startsWith("M")) || (element.area.startsWith("m"))) {
                  this.medica  = this.medica + 1    
                }                                
            });
            var total = this.medica + this.tecnologica + this.humanas;
            this.medica = this.medica * 100 / total;
            this.tecnologica = this.tecnologica * 100 / total;
            this.humanas = this.humanas * 100 / total;
        }, 
    },
    watch: {
        projetos: function() {
            this.calcularPercentuais()
        },          
    }
}
</script>

<style>

.principal {
    /*border: 1px solid blue;*/
    margin: 0 auto;
    margin-top: 50px;
    width: 50%;
    display: flex;
    justify-items: center;
    align-items: center;
}

.box {
    background-color: aquamarine;
    width: 200px;
    margin: 10px;
    height: 100px;
    text-align: center;
    /*float: left;*/
    display: inline-block;
}

</style>