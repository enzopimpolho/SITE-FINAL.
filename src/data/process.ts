export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { title: "Descoberta", description: "Entendemos o negócio e o problema." },
  { title: "Arquitetura", description: "Definimos experiência, tecnologia e estrutura." },
  { title: "Desenvolvimento", description: "Construímos e validamos o produto." },
  { title: "Entrega", description: "Publicação, ajustes e evolução." },
];
