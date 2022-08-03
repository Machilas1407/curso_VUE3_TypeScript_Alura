<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label display">
                    Nome do Projeto
                </label>
                <input type="text" v-model="nomeDoProjeto" id="nomeDoProjeto" class="input">
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from '@/store'
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador"
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    // mounted() {
    //     if (this.id) {
    //         const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id)
    //         this.nomeDoProjeto = projeto?.nome || ''
    //     }
    // },
    // data() {
    //     return {
    //         nomeDoProjeto: ''
    //     }
    // },
    // methods: {
    //     salvar() {
    //         if (this.id) {
    //             this.store.dispatch(ALTERAR_PROJETO, {
    //                 id: this.id,
    //                 nome: this.nomeDoProjeto
    //             }).then(() => this.lidarComSucesso());
    //         } else {
    //             this.store
    //                 .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
    //                 .then(() => this.lidarComSucesso());
    //         }


    //     },
    //     lidarComSucesso() {
    //         this.nomeDoProjeto = '';
    //         this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'Prontinho 😉  o projeto foi cadastrado com sucesso!')
    //         this.$router.push('/projetos')
    //     }

    // },

    setup(props) {

        const router = useRouter()  // useRouter é para ter acesso ao roteador do Vue o useRoute é para ter acesso a rota atual(pegar parametros como id)

        const store = useStore()
        const { notificar } = useNotificador()
        const nomeDoProjeto = ref("") // equivale ao data (referencia a uma string)

        //forma usada no mouted
        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            nomeDoProjeto.value = projeto?.nome || '' // o value é para pegar o valor que esta na referencia
        }
        //

        //forma usada no methods

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value // tira o this e coloca o value(valor da variavel reativa)
                }).then(() => lidarComSucesso());
            } else {
                store
                    .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso());
            }
        }

        const lidarComSucesso = () => {
            nomeDoProjeto.value = '';
            notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'Prontinho 😉  o projeto foi cadastrado com sucesso!')
            router.push('/projetos')
        }
        //


        return {
            // store, nao sao usadas fora do setup
            // notificar, nao tem necessidade de um return
            nomeDoProjeto,
            salvar,
            //lidarComSucesso, nao tem necessidade de um return
            //router, nao tem necessidade de um return
        }
    }


})
</script>
<style>
.display {
    color: var(--texto-primario);
}
</style>