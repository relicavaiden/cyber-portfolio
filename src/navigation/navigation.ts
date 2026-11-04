//Allowed navigation item statuses
export type NavigationStatus = "available" | "disabled" | "coming-soon";

//Shape of a single navigation item
export interface NavigationItem {
    name: string;
    path: string;
    status: NavigationStatus;
}

const home: NavigationItem = {
    name: "Home",
    path: "/",
    status: "available"
};
const about: NavigationItem = {
    name: "About",
    path: "/about",
    status: "coming-soon"
};
const projects: NavigationItem = {
    name: "Projects",
    path: "/projects",
    status: "available"
};
const blog: NavigationItem = {
    name: "Blog",
    path: "/blog",
    status: "available"
};
const resume: NavigationItem = {
    name: "Resume",
    path: "/resume",
    status: "available"
};

export const navigation: NavigationItem[] = [
  home,
  about,
  projects,
  blog,
  resume
];