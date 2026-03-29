import type { Route } from "./+types/home";
import { Main } from "../pages/Main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bookmark Manager" },
    { name: "description", content: "Manage your bookmarks efficiently!" },
  ];
}

export default function Home() {
  return <Main />;
}
