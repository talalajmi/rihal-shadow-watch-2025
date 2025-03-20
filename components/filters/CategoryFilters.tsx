import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFormUrlQuery } from "@/lib/url";

enum CrimeType {
  Assault = "assault",
  Robbery = "robbery",
  Homicide = "homicide",
  Kidnapping = "kidnapping",
}

const categories = [
  {
    categoryName: "Assault",
    icon: "/icons/assault.png",
    type: CrimeType.Assault,
  },
  {
    categoryName: "Robbery",
    icon: "/icons/robbery.png",
    type: CrimeType.Robbery,
  },
  {
    categoryName: "Homicide",
    icon: "/icons/homicide.png",
    type: CrimeType.Homicide,
  },
  {
    categoryName: "Kidnapping",
    icon: "/icons/kidnapping.png",
    type: CrimeType.Kidnapping,
  },
];

const CategoryFilters = () => {
  // ** Hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  // ** Constants
  const filter = searchParams.get("filter");
  const [activeCategory, setActiveCategory] = useState(filter || "");

  const handleFilterCategory = (category: string) => {
    let newUrl = "";

    if (category === activeCategory) {
      setActiveCategory("");

      newUrl = removeKeysFormUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    } else {
      setActiveCategory(category);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex justify-start sm:justify-center space-x-5 overflow-x-auto">
      {categories.map((category) => (
        <Button
          key={category.type}
          className="rounded-full cursor-pointer"
          onClick={() => handleFilterCategory(category.type)}
          variant={activeCategory === category.type ? "default" : "outline"}
        >
          <Image src={category.icon} alt="" width={24} height={24} />
          {category.categoryName}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilters;
