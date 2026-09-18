/** Versão de visualização publicada como página estática: sem servidor, sem chave do Google, sem downloads. */
export const IS_PREVIEW = import.meta.env.VITE_PREVIEW === '1';

export const PREVIEW_SEARCH_MESSAGE =
  'Nesta versão de visualização a busca real no Google Maps fica desativada. Para buscar empresas de verdade, rode o LeadJá no seu computador (npm run dev).';
