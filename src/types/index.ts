export type NavLink = {
  readonly label: string;
  readonly href: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type SectionId =
  | "hero"
  | "about"
  | "services"
  | "skills"
  | "projects"
  | "experience"
  | "testimonials"
  | "stats"
  | "contact";
