# Nextgen — Site Institucional

Site institucional da **Nextgen**, empresa fictícia de desenvolvimento de sites, sistemas web e
aplicações digitais sob medida, sediada em São Paulo/SP.

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [React Router](https://reactrouter.com/) para navegação entre páginas
- [Framer Motion](https://www.framer.com/motion/) para animações e scroll reveal
- [Lucide React](https://lucide.dev/) para ícones
- Dados 100% mockados localmente (`src/data`) — **sem backend**

## Estrutura do projeto

```
src/
  components/   componentes reutilizáveis (Navbar, Footer, cards, formulário, etc.)
  sections/     seções compostas usadas nas páginas (Hero, Serviços, Contato, etc.)
  pages/        páginas roteadas (Home, Serviços, Portfólio, Sobre, Contato, 404)
  data/         dados mockados (serviços, projetos, depoimentos, processo, empresa)
  context/      contexto de tema (dark/light)
```

## Páginas

| Rota          | Descrição                                      |
| ------------- | ----------------------------------------------- |
| `/`           | Home com Hero, Serviços, Diferenciais, Portfólio, Processo, Depoimentos e Contato |
| `/servicos`   | Lista completa de serviços com detalhes         |
| `/portfolio`  | Portfólio completo com filtro por categoria     |
| `/sobre`      | Missão, visão, valores, diferenciais e processo |
| `/contato`    | Formulário de contato, informações e mapa       |

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior instalado.

```bash
npm install
npm run dev
```

O projeto sobe por padrão em `http://localhost:5173`.

### Outros scripts

```bash
npm run build     # build de produção (roda type-check + vite build)
npm run preview   # serve o build de produção localmente
```

## Notas

- O tema padrão é **escuro**; há um toggle claro/escuro no header, com preferência salva em `localStorage`.
- O formulário de contato é apenas ilustrativo (não envia dados a nenhum servidor).
- Imagens de projetos no portfólio são placeholders em gradiente — substitua pelos cases reais quando integrar com projetos verdadeiros.
- Meta tags de SEO básico (title, description, Open Graph, Twitter Card) estão configuradas em `index.html`.
