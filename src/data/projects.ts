export interface ProjectCrop {
  x: number;
  y: number;
  width: number;
}

export interface Project {
  name: string;
  category: string;
  image: string;
  // Area of the main (desktop) panel inside the 1024×572 mockup collage, in source pixels.
  crop: ProjectCrop;
}

export const SOURCE_WIDTH = 1024;
export const SOURCE_HEIGHT = 572;

export const projects: Project[] = [
  { name: "PetCare", category: "Pet shop", image: "/portfolio/petcare.jpg", crop: { x: 39, y: 35, width: 395 } },
  { name: "Bella Itália", category: "Restaurante", image: "/portfolio/bella-italia.jpg", crop: { x: 35, y: 34, width: 420 } },
  { name: "Urban Style", category: "E-commerce", image: "/portfolio/urban-style.jpg", crop: { x: 76, y: 32, width: 309 } },
  { name: "Vintage Club", category: "Barbearia", image: "/portfolio/vintage-club.jpg", crop: { x: 35, y: 30, width: 432 } },
  { name: "Gestão Pro", category: "Sistema web", image: "/portfolio/gestao-pro.jpg", crop: { x: 34, y: 31, width: 450 } },
  { name: "FitLife", category: "Academia", image: "/portfolio/fitlife.jpg", crop: { x: 38, y: 30, width: 329 } },
  { name: "SaaS Launch", category: "Landing page", image: "/portfolio/saas-launch.jpg", crop: { x: 28, y: 29, width: 346 } },
];
