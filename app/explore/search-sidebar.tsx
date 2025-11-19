"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce, parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";

export default function SearchSidebar() {
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withOptions({
      history: "replace",
      shallow: false,
    })
  );
  const [filterBy, setFilterBy] = useQueryState(
    "filterBy",
    parseAsString.withOptions({
      history: "replace",
      shallow: false,
    })
  );
  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsInteger.withOptions({
      history: "replace",
      shallow: false,
    })
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsInteger.withOptions({
      history: "replace",
      shallow: false,
    })
  );
  const handleSortByChange = (value: string) => {
    setSortBy(value, {
      // limitUrlUpdates: value === "" ? undefined : debounce(500),
    });
  };
  return (
    <Sidebar collapsible="none" className="h-full w-md">
      <SidebarContent>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Sort By</SidebarGroupLabel>
            <SidebarGroupContent className="w-full">
              <Select
                value={sortBy || "alphabetical"}
                onValueChange={handleSortByChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="lowestPrice">Lowest Price</SelectItem>
                    <SelectItem value="highestPrice">Highest Price</SelectItem>
                    <SelectItem value="alphabeticalAsc">A-Z</SelectItem>
                    <SelectItem value="alphabeticalDesc">Z-A</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Filters</SidebarGroupLabel>
            <SidebarGroupContent className="w-full">
              <div className="flex flex-col gap-2">
                <SidebarGroupLabel className="text-xs">Price</SidebarGroupLabel>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    alt="Min Price"
                    value={minPrice || -Infinity}
                    onChange={async (e) =>
                      await setMinPrice(
                        (e.target as HTMLInputElement).value.length > 0
                          ? Number((e.target as HTMLInputElement).value)
                          : -Infinity,
                        {
                          limitUrlUpdates:
                            (e.target as HTMLInputElement).value.length === 0
                              ? undefined
                              : debounce(100),
                        }
                      )
                    }
                  />
                  <span className="text-sm"> - </span>
                  <Input
                    type="number"
                    placeholder="Max"
                    alt="Max Price"
                    value={maxPrice || Infinity}
                    onChange={async (e) =>
                      await setMaxPrice(
                        (e.target as HTMLInputElement).value.length > 0
                          ? Number((e.target as HTMLInputElement).value)
                          : Infinity,
                        {
                          limitUrlUpdates:
                            (e.target as HTMLInputElement).value.length === 0
                              ? undefined
                              : debounce(100),
                        }
                      )
                    }
                  />
                </div>
              </div>
              {minPrice && maxPrice && minPrice > maxPrice ? (
                <p className="text-sm text-red-500">
                  Min price must be less than max price
                </p>
              ) : null}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarContent>
    </Sidebar>
  );
}
