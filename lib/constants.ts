export const DEMO_USER = {
  id: "u-admin-001",
  name: "Admin Tomates",
  email: "admin@tomates.com",
  password: "1234",
  role: "Administrador"
};

export const HTML_TAGS = [
  "html",
  "head",
  "body",
  "header",
  "main",
  "section",
  "article",
  "nav",
  "aside",
  "footer",
  "h1",
  "p",
  "a",
  "img",
  "button"
];

export const HTML_TAG_USAGE = [
  { tag: "html", value: 68 },
  { tag: "head", value: 54 },
  { tag: "body", value: 88 },
  { tag: "header", value: 73 },
  { tag: "main", value: 84 },
  { tag: "section", value: 91 },
  { tag: "article", value: 62 },
  { tag: "nav", value: 57 },
  { tag: "aside", value: 41 },
  { tag: "footer", value: 66 },
  { tag: "h1", value: 79 },
  { tag: "p", value: 95 },
  { tag: "a", value: 86 },
  { tag: "img", value: 71 },
  { tag: "button", value: 76 }
];

export type CourseIconName =
  | "state"
  | "blocks"
  | "share"
  | "route"
  | "code"
  | "list"
  | "pointer"
  | "navigation"
  | "server";

export const COURSE_FUNCTIONS = [
  {
    name: "useState",
    icon: "state",
    description: "Gestiona el estado local de componentes y formularios."
  },
  {
    name: "Componentes",
    icon: "blocks",
    description: "Separan la interfaz en piezas reutilizables."
  },
  {
    name: "Props",
    icon: "share",
    description: "Pasan datos entre componentes."
  },
  {
    name: "App Router",
    icon: "route",
    description: "Organiza rutas y navegación en Next.js."
  },
  {
    name: "TypeScript",
    icon: "code",
    description: "Define tipos e interfaces para controlar los datos."
  },
  {
    name: "map()",
    icon: "list",
    description: "Renderiza listas y bloques repetidos."
  },
  {
    name: "Eventos",
    icon: "pointer",
    description: "Responden a acciones del usuario."
  },
  {
    name: "useRouter",
    icon: "navigation",
    description: "Permite redirigir y navegar entre páginas."
  }
] satisfies Array<{
  name: string;
  icon: CourseIconName;
  description: string;
}>;
