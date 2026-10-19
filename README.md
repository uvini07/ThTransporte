# TH Transporte — Landing page corporativa

Landing page B2B para uma empresa de transporte corporativo, executivo, eventos e logística.
React + TypeScript + Vite, Tailwind CSS v4, Motion (`motion/react`), React Hook Form + Zod e Lucide.

> **Estado atual: modo demonstração.** Nenhum número, cliente, certificação ou contato foi inventado.
> Todo dado ainda não fornecido aparece como **“A informar”**, todo item não confirmado traz o selo
> **“A confirmar”**, e as ilustrações de veículos trazem o selo **“Imagem ilustrativa”**.
> Um botão fixo no canto inferior esquerdo lista automaticamente todas as pendências.

---

## Instalação e execução

Requisitos: Node.js 20.19+ (testado com Node 22) e npm.

```bash
npm install
cp .env.example .env      # ajuste as variáveis (veja abaixo)
npm run dev               # http://localhost:5173
```

| Script              | O que faz                                              |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Servidor de desenvolvimento                            |
| `npm run build`     | Checagem de tipos + build de produção em `dist/`       |
| `npm run preview`   | Serve o build de produção localmente                   |
| `npm run typecheck` | Apenas checagem de tipos                               |
| `npm run lint`      | ESLint (TypeScript + regras de hooks do React)         |

O resultado de `npm run build` é estático (`dist/`) e pode ser publicado em qualquer hospedagem estática
(Vercel, Netlify, Cloudflare Pages, S3 + CloudFront etc.). As variáveis `VITE_*` são lidas **no momento do build**:
configure-as no painel da hospedagem antes de gerar a versão pública.

## Configuração (`.env`)

| Variável             | Padrão | Descrição |
| -------------------- | ------ | --------- |
| `VITE_DEMO_MODE`     | `true` | `true`: mostra marcadores “A informar”/“A confirmar”, o painel de pendências e adiciona `noindex`. `false`: versão pública — campos vazios e itens não confirmados ficam **ocultos**, seções sem conteúdo somem do menu e a página fica indexável. |
| `VITE_FORM_ENDPOINT` | vazio  | URL que recebe o formulário via `POST` (JSON). Vazio = formulário em modo demonstração (valida, mas **não envia** e avisa o visitante). |

### Integração do formulário

O formulário envia `POST` com `Content-Type: application/json` e `Accept: application/json`, contendo:
`name, company, role, email, phone, service, volume, region, frequency, message, consent, _subject, origem`.
Qualquer resposta HTTP 2xx é tratada como sucesso; outras respostas, falhas de rede ou tempo acima de 15 s
exibem erro e o visitante pode tentar de novo.

- **Formspree** (mais simples): crie um formulário e use `VITE_FORM_ENDPOINT=https://formspree.io/f/SEU_ID`.
  Getform, Basin e serviços equivalentes que aceitam JSON também funcionam.
- **Backend próprio**: qualquer rota que aceite JSON e responda 2xx. Habilite CORS para o domínio do site.

Há um campo-isca invisível (`website`) contra robôs e consentimento LGPD obrigatório.
Enquanto não houver endpoint, ao validar o formulário o visitante recebe um resumo e — se e-mail/WhatsApp
estiverem configurados — botões para enviá-lo por esses canais. O site nunca simula um envio bem-sucedido.

## Onde editar o conteúdo

Todo o conteúdo fica em `src/data/`. Os componentes não precisam ser alterados para trocar textos, números,
fotos, serviços ou clientes.

| Arquivo                     | Conteúdo |
| --------------------------- | -------- |
| `src/data/company.ts`       | Nome, logotipo, slogan, região, contatos, WhatsApp, domínio, redes sociais, ano de fundação, total de clientes, mídia do hero, textos do hero e de SEO |
| `src/data/services.ts`      | As 5 frentes de serviço (`confirmed`, textos, destaques, pendências, foto) |
| `src/data/fleet.ts`         | Categorias da frota (quantidade, capacidade, características, aplicações, disponibilidade, foto, galeria) |
| `src/data/team.ts`          | Estrutura operacional (equipe total, motoristas, alocados × disponíveis, cobertura, modelo de operação) |
| `src/data/differentials.ts` | Diferenciais e segurança operacional |
| `src/data/clients.ts`       | Logotipos de clientes, depoimentos, estudos de caso, certificações, segmentos |
| `src/data/content.ts`       | Textos “Sobre nós”, compromissos, etapas da contratação, opções de frequência |

Regras de integridade aplicadas pelo código:

- Campos `null` nunca viram número: aparecem como “A informar” (demo) ou são ocultados (público).
- Serviços, categorias de frota e diferenciais com `confirmed: false` só aparecem no modo demonstração.
- Logotipos, depoimentos e estudos de caso só aparecem com `authorized: true`.
- O **total da frota** é a soma das quantidades das categorias (`src/lib/content.ts`). Cada veículo deve
  constar em uma única categoria (ex.: não conte vans executivas também em “Vans”). Os indicadores do topo
  só exibem o total quando todas as categorias publicadas têm quantidade.
- **Anos de experiência** são calculados a partir de `foundedYear`.
- Os dados estruturados Schema.org (`seo.config.ts`) incluem somente campos preenchidos.

### Substituir logotipo

1. Coloque o arquivo em `public/brand/logo.svg` (SVG preferível; PNG com fundo transparente também serve).
2. Em `src/data/company.ts`, defina `logo: '/brand/logo.svg'`.
3. Substitua `public/favicon.svg`, `public/apple-touch-icon.png` (180×180) e `public/og-image.png` (1200×630).
4. Ajuste as cores da marca nos tokens de `src/styles/index.css` (`--color-accent`, `--color-ink` etc.).

### Substituir imagens (frota, serviços e hero)

As ilustrações técnicas em SVG representam a *categoria* do veículo e sempre trazem o selo “Imagem ilustrativa”.
Para usar fotografias reais:

1. Exporte em **WebP ou AVIF**, ~1600 px de largura (proporção 16:10 para frota/serviços), até ~250 KB.
2. Salve em `public/fleet/`, `public/services/` ou `public/media/`.
3. Preencha `image: '/fleet/vans.webp'` e `imageAlt` (descreva o veículo real) na categoria/serviço.
4. Para fotos extras no painel de detalhes da frota, use `gallery: [{ src, alt }]`.
5. Para o hero, defina `heroMedia` em `company.ts` — imagem (`type: 'image'`) ou vídeo curto, mudo e
   em loop (`type: 'video'`, com `poster`). O vídeo não é reproduzido automaticamente para quem prefere movimento reduzido.

Quando há foto, o selo “Imagem ilustrativa” some automaticamente.

### Adicionar clientes

1. Salve os logotipos em `public/clients/` (SVG de preferência).
2. Em `src/data/clients.ts`: `logos: [{ name: 'Empresa X', logo: '/clients/empresa-x.svg', authorized: true }]`.
3. Com 5 ou mais logotipos, a faixa vira um letreiro contínuo (pausa ao passar o mouse).

### Política de privacidade

O modelo em `src/components/layout/PrivacyPolicy.tsx` é um rascunho baseado na LGPD. Revise com a assessoria jurídica
e complete razão social, CNPJ e o e-mail do encarregado. A política abre em `#politica-de-privacidade`
(link direto funciona e o botão Voltar do navegador a fecha).

## Informações que ainda precisam ser fornecidas

O painel “Modo demonstração” do site gera esta lista automaticamente. Hoje faltam:

**Empresa** — confirmação do nome oficial (provisório: “TH Transporte”, derivado do nome do repositório), logotipo,
slogan, cidade-sede, região de atuação, ano de fundação, total de clientes corporativos, razão social, CNPJ,
endereço, cores institucionais.

**Contato** — telefone comercial, WhatsApp comercial, e-mail comercial, domínio do site, redes sociais oficiais,
endpoint do formulário (`VITE_FORM_ENDPOINT`).

**Serviços** — confirmar quais das 5 frentes são oferecidas; modalidades de carga, abrangência geográfica, tipos de
operação logística, modelos de contrato, cidades atendidas, veículos executivos, traslados de aeroporto, porte máximo
de eventos, modelos de contratação (por demanda, fretamento, recorrente).

**Frota** — quais categorias existem (carros executivos, SUVs, vans executivas, vans, micro-ônibus, ônibus,
utilitários, caminhões), quantidade por categoria, capacidade (passageiros ou carga), disponibilidade, fotos reais e
revisão das características/aplicações sugeridas.

**Estrutura operacional** — total de colaboradores, motoristas, equipe de logística/operação, administrativo/suporte,
profissionais alocados × disponíveis para novos contratos, cobertura geográfica, capacidade de atendimento simultâneo,
modelo de operação (própria, terceirizada ou mista).

**Diferenciais** — confirmar cada um dos 10 itens (planejamento de rotas, gestão de frota, manutenção preventiva,
treinamento, monitoramento, gestão de horários, flexibilidade, suporte, processos de segurança, documentação/licenças).

**Credibilidade** — logotipos de clientes com autorização de uso, depoimentos reais, estudos de caso e indicadores
documentados, certificações e licenças válidas, segmentos atendidos.

**Textos** — revisão dos textos de “Sobre nós”, compromissos e headline (depois marque `about.reviewed = true`),
revisão jurídica da Política de Privacidade.

## Checklist de publicação

1. Preencher `src/data/*` com dados confirmados e marcar `confirmed: true` / `authorized: true` onde couber.
2. Substituir logotipo, favicon, ícone Apple, imagem Open Graph e fotos.
3. Definir `domain` em `company.ts` (gera canonical, `og:url` e `og:image` absolutos).
4. Configurar `VITE_FORM_ENDPOINT` e fazer um envio de teste real.
5. Gerar o build com `VITE_DEMO_MODE=false` e revisar a página.
6. Medir com Lighthouse no domínio final.

## Arquitetura

```
src/
  App.tsx                      Composição das seções (formulário carregado sob demanda)
  main.tsx                     Entrada, fontes auto-hospedadas
  components/
    layout/                    Header, Footer, PrivacyPolicy, DemoPanel, WhatsAppFloat
    sections/                  Hero, Services, Fleet, Operations, Differentials, About, Clients, Process, Contact
    illustrations/             Vehicle (ilustrações SVG), RouteField, MediaFrame (foto real ou ilustração)
    ui/                        Button, Dialog, Reveal, MaskText, Counter, SectionHeading, LightPanel, Pending, Icon…
  data/                        Conteúdo editável (ver tabela acima)
  hooks/                       useActiveSection (menu ativo), useHashFlag (diálogo por hash)
  lib/                         config (env), content (visibilidade, totais, pendências), contact (links),
                               motion (curvas/durações), quote (pré-preenchimento), quoteSchema (validação)
  styles/index.css             Tokens de marca (Tailwind v4 @theme) e utilitários
  types/index.ts               Tipos de todos os dados
seo.config.ts                  Title, meta, Open Graph e Schema.org gerados no build a partir de company.ts
```

### Sistema de movimento

- `motion/react` para entradas (fade + blur + deslocamento), revelação de títulos por máscara, contadores,
  parallax discreto, desenho de SVG (`pathLength`), transição miniatura → detalhe na frota (`layoutId`),
  indicador de seção ativa, menu mobile e seções claras que “deslizam” sobre as escuras.
- Curvas e durações centralizadas em `src/lib/motion.ts`. Animações usam `transform`/`opacity`;
  efeitos contínuos são pequenos (faixas de luz, pulso de nós) e feitos em CSS.
- `prefers-reduced-motion`: `MotionConfig reducedMotion="user"` remove deslocamentos, o parallax e a revelação
  por rolagem são desativados no código, animações CSS são neutralizadas e o vídeo do hero não inicia sozinho.
- Nenhuma animação prende a rolagem nem esconde conteúdo essencial; o título do hero está completo para leitores de tela desde o início.
- Sem GSAP, Three.js ou Lenis: não havia sequência ou modelo 3D real que justificasse o peso extra.
  Não há modelos 3D dos veículos, então nenhum 3D é simulado.

### Acessibilidade

HTML semântico com hierarquia de títulos, link “Pular para o conteúdo”, foco visível, navegação por teclado,
diálogos com foco preso, Esc e retorno de foco, `aria-current` no menu, `aria-pressed` nos filtros,
`aria-invalid`/`aria-describedby` no formulário com foco automático no primeiro erro, contraste verificado e
botões e controles com área de toque adequada (Lighthouse sem alertas de tamanho de alvo).

## Qualidade medida

Lighthouse 12 (Chromium headless, build de produção servido por `vite preview`, sem CDN/compressão do host):

| Build                                   | Perf. | Acess. | Boas práticas | SEO |
| --------------------------------------- | ----- | ------ | ------------- | --- |
| Público (`VITE_DEMO_MODE=false`), desktop | 100   | 100    | 100           | 100 |
| Público, mobile (throttling simulado)   | 93    | 100    | 100           | 100 |
| Demonstração, desktop                   | 100   | 100    | 100           | 63* |
| Demonstração, mobile                    | 80    | 100    | 100           | 63* |

\* O modo demonstração recebe `noindex` de propósito, por isso o SEO cai. No mobile, a versão de demonstração tem
mais conteúdo (todas as seções com marcadores), o que aumenta o trabalho de JavaScript. Repita a medição no
domínio final, com as fotos reais.

Também verificado com Playwright: sem erros de console, sem rolagem horizontal em 360, 390, 768, 1024, 1440 e
1920 px, navegação do menu, filtros e painel da frota, armadilha de foco nos diálogos, pré-preenchimento do
formulário pelos CTAs, máscara de telefone, validação, envio real para um endpoint de teste (sucesso e erro HTTP 500),
link do WhatsApp com mensagem codificada e funcionamento com movimento reduzido.
