import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFormUrlQuery } from "@/lib/url";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

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

  return (
    <PlaceholdersAndVanishInput
      onSubmit={() => {}}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholders={["Search for a crime", "Search for a location"]}
    />
  );
};

export default SearchCrimeBar;
