import { TipoNotificacao } from "@/interfaces/INotificacao"
import { NOTIFICAR } from "@/store/tipo-mutacoes"
import { store } from "@/store"


type Notidicador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void
}

export default (): Notidicador => {
    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string): void => {
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        })
    }

    return {
        notificar
    }
}