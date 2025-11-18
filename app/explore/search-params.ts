import { parseAsString, createLoader } from "nuqs/server";

export const searchParams = {
  search: parseAsString.withDefault("").withOptions({
    history: "replace",
  }),
  sortBy: parseAsString.withDefault("").withOptions({
    history: "replace",
  }),
  filterBy: parseAsString.withDefault("all").withOptions({
    history: "replace",
  }),
  filterValue: parseAsString.withDefault("").withOptions({
    history: "replace",
  }),
};
export const loadSearchParams = createLoader(searchParams);
export type SearchParams = ReturnType<typeof loadSearchParams>;
