<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para a criaçào de uma nova tarefa">
                <input type="text" class="input" v-model="descricao" placeholder="Qual tarefa você deseja iniciar?" />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o Projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { key } from "@/store"
import { computed, defineComponent, ref } from "vue"
import { useStore } from "vuex"
import Temporizador from "./Temporizador.vue"

export default defineComponent({
    name: "Formulario",
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    // data() {
    //     return {
    //         descricao: '',
    //         idProjeto: ''
    //     }
    // },
    // methods: {
    //     finalizarTarefa(tempoDecorrido: number): void {
    //         this.$emit('aoSalvarTarefa', {
    //             duracaoEmSegundos: tempoDec orrido,
    //             descricao: this.descricao,
    //             projeto: this.projetos.find(proj => proj.id == this.idProjeto)
    //         })
    //         this.descricao = ''
    //     }
    // },

    // explicacao do setuo no arquivo de formulario
    setup(props, { emit }) {  // poderia usar o contexto mas desestruturou e pegou somente o emit

        const store = useStore(key)

        const projetos = computed(() => store.state.projeto.projetos)

        const descricao = ref('')
        const idProjeto = ref('')

        const finalizarTarefa = (tempoDecorrido: number): void => {
            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)
            })
            descricao.value = ''
        }

        return {
            projetos,
            descricao,
            idProjeto,
            finalizarTarefa
        }
    }
})
</script>
<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>