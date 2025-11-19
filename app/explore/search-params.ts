import { parseAsString, createLoader, parseAsInteger } from "nuqs/server";

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
  minPrice: parseAsInteger.withDefault(-Infinity).withOptions({
    history: "replace",
  }),
  maxPrice: parseAsInteger.withDefault(Infinity).withOptions({
    history: "replace",
  }),
};
export const loadSearchParams = createLoader(searchParams);
export type SearchParams = ReturnType<typeof loadSearchParams>;
