import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentSearch = searchParams.get("search") || "";

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (newSearch) newParams.set("search", newSearch);
    else newParams.delete("search");
    newParams.set("page", 1); // Reset to page 1 on search
    navigate(`?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col items-start">
    <Input
      placeholder="Search products..."
      defaultValue={currentSearch}
      onChange={handleSearchChange}
      className="w-full sm:w-64"
    />
    </div>
  );
};

export default SearchBar;
