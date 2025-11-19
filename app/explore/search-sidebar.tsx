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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce, parseAsString, useQueryState } from "nuqs";

export default function SearchSidebar() {
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withOptions({
      history: "replace",
      shallow: false,
    })
  );
  const handleSortByChange = (value: string) => {
    setSortBy(value, {
      limitUrlUpdates: value === "" ? undefined : debounce(500),
    });
  };
  return (
    <Sidebar collapsible="none" className="h-full">
      <SidebarContent>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Sort By</SidebarGroupLabel>
            <SidebarGroupContent>
              <Select
                onOpenChange={(open) => {
                  if (!open) {
                    setSortBy(null);
                  }
                }}
                value={sortBy || ""}
                onValueChange={handleSortByChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="lowestPrice">Lowest Price</SelectItem>
                    <SelectItem value="highestPrice">Highest Price</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarContent>
    </Sidebar>
  );
}
