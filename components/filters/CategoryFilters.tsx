"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFormUrlQuery } from "@/lib/url";
import { categories } from "@/lib/utils";

const CategoryFilters = () => {
  // ** Hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  // ** Constants
  const filter = searchParams.get("filter");
  const [activeFilter, setActiveFilter] = useState(filter || "");

  const handleFilterCategory = (filter: string) => {
    let newUrl = "";

    if (filter === activeFilter) {
      // Clear the filter if the same filter is clicked
      setActiveFilter("");

      newUrl = removeKeysFormUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      // Set the new filter
      setActiveFilter(filter);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-4 overflow-x-auto w-full justify-start lg:justify-center">
      {categories.map((category) => (
        <Button
          key={category.type}
          className="rounded-full cursor-pointer"
          onClick={() => handleFilterCategory(category.type)}
          variant={activeFilter === category.type ? "default" : "outline"}
        >
          <Image
            width={24}
            height={24}
            src={category.icon}
            alt={category.categoryName}
          />
          {category.categoryName}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilters;
