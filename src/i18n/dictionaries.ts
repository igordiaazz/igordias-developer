import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { isLocale, type Locale } from "./routing";

const dictionaries: Record<Locale, () => Promise<typeof import("./messages/pt.json")>> = {
  pt: () => import("./messages/pt.json").then((m) => m.default),
  en: () => import("./messages/en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["pt"]>>;

export async function getDictionary(): Promise<Dictionary> {
  const current = await lang();
  if (!isLocale(current)) notFound();
  return dictionaries[current]();
}
