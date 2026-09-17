export interface Project {
  name: string;
  category: string;
  slug: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
}

export const projects: Project[] = [
  { name: "PetCare", category: "Pet shop", slug: "petcare", image: "/portfolio/petcare.webp", imageWidth: 1440, imageHeight: 1800 },
  { name: "Bella Itália", category: "Restaurante", slug: "bella-italia", image: "/portfolio/bella-italia.webp", imageWidth: 1440, imageHeight: 1800 },
  { name: "Urban Style", category: "E-commerce", slug: "urban-style", image: "/portfolio/urban-style.webp", imageWidth: 1440, imageHeight: 1800 },
  { name: "Vintage Club", category: "Barbearia", slug: "vintage-club", image: "/portfolio/vintage-club.webp", imageWidth: 1440, imageHeight: 1800 },
  { name: "Gestão Pro", category: "Sistema web", slug: "gestao-pro", image: "/portfolio/gestao-pro.webp", imageWidth: 1440, imageHeight: 1800 },
  { name: "FitLife", category: "Academia", slug: "fitlife", image: "/portfolio/fitlife.webp", imageWidth: 1440, imageHeight: 1800 },
  { name: "SaaS Launch", category: "Landing page", slug: "saas-launch", image: "/portfolio/saas-launch.webp", imageWidth: 1440, imageHeight: 1800 },
];
