/** Modo demonstração: ativo por padrão até que VITE_DEMO_MODE=false seja definido. */
export const isDemo = import.meta.env.VITE_DEMO_MODE !== 'false'

/** Endpoint real do formulário. Vazio = formulário em modo demonstração. */
export const formEndpoint: string | null = import.meta.env.VITE_FORM_ENDPOINT?.trim() || null
