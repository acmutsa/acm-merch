import { parseAsString, createLoader } from "nuqs/server";

export const searchParams = {
  search: parseAsString.withDefault("").withOptions({
    history: "replace",
  }),
};
export const loadSearchParams = createLoader(searchParams);
