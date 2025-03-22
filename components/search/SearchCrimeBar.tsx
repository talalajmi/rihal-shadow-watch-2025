"use client";

import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFormUrlQuery } from "@/lib/url";

const SearchCrimeBar = () => {
  // ** Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // ** States
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFormUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, searchParams]);

  const handleSearchCrime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase());
  };

  return (
    <div className="relative w-full flex justify-center items-center">
      <Search className="absolute left-5 text-gray-400" size={20} />
      <Input
        value={searchQuery}
        onChange={handleSearchCrime}
        placeholder="Search by type, date, or ID (e.g. Homicide, 2025-03-08, 15)"
        className="bg-white pl-12 h-12 w-full rounded-full"
      />
    </div>
  );
};

export default SearchCrimeBar;
