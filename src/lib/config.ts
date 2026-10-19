/** Modo demonstração: só ativo com VITE_DEMO_MODE=true. */
export const isDemo = import.meta.env.VITE_DEMO_MODE === 'true'

/** Endpoint real do formulário. Vazio = formulário em modo demonstração. */
export const formEndpoint: string | null = import.meta.env.VITE_FORM_ENDPOINT?.trim() || null
