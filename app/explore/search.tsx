"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseAsString, useQueryState, debounce } from "nuqs";
export default function Search() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withOptions({
      history: "replace",
      shallow: false,
    })
  );
  return (
    <div className="flex gap-2">
      <Input
        value={search || ""}
        onChange={(e) =>
          setSearch(e.target.value, {
            limitUrlUpdates: e.target.value === "" ? undefined : debounce(500),
          })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearch(e.currentTarget.value);
          }
        }}
        placeholder="Search for a product"
      />
      <Button onClick={() => setSearch(search || "")}>Search</Button>
    </div>
  );
}
