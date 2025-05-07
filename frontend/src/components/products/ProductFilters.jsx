import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
  } from "@/components/ui/popover";
  import { Button } from "@/components/ui/button";
  import { Filter } from "lucide-react";
  import { useNavigate, useSearchParams } from "react-router-dom";
  import { useState } from "react";
  
  const categories = ["All", "Electronics", "Apparel", "Accessories", "Furniture", "Stationery"];
  const stockLevels = ["All", "low", "Medium", "High"];
  
  const ProductFilters = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
  
    const [filters, setFilters] = useState({
      category: searchParams.get("category") || "All",
      stock_level: searchParams.get("stock_level") || "All",
      min_price: searchParams.get("min_price") || "",
      max_price: searchParams.get("max_price") || "",
      min_quantity: searchParams.get("min_quantity") || "",
      max_quantity: searchParams.get("max_quantity") || "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newParams = new URLSearchParams(searchParams);
  
      Object.entries(filters).forEach(([key, value]) => {
        if (!value || value === "All") newParams.delete(key);
        else newParams.set(key, value);
      });
  
      newParams.set("page", "1"); // Reset to first page
      navigate(`?${newParams.toString()}`);
    };
  
    const handleClear = () => {
      setFilters({
        category: "All",
        stock_level: "All",
        min_price: "",
        max_price: "",
        min_quantity: "",
        max_quantity: "",
      });
      navigate(`?page=1`);
    };
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filters
          </Button>
        </PopoverTrigger>
  
        <PopoverContent className="w-[320px] sm:w-[400px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category */}
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold">Category</span>
              <Select
                onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                value={filters.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
  
            {/* Stock Level */}
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold">Stock Level</span>
              <Select
                onValueChange={(value) => setFilters((prev) => ({ ...prev, stock_level: value }))}
                value={filters.stock_level}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Stock Level" />
                </SelectTrigger>
                <SelectContent>
                  {stockLevels.map((lvl) => (
                    <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
  
            {/* Price Range */}
            <div className="flex gap-2">
              <div className="flex flex-col w-1/2">
                <span className="text-sm font-bold">Min Price</span>
                <Input
                  type="number"
                  value={filters.min_price}
                  placeholder="e.g. 100"
                  onChange={(e) => setFilters((prev) => ({ ...prev, min_price: e.target.value }))}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <span className="text-sm font-bold">Max Price</span>
                <Input
                  type="number"
                  value={filters.max_price}
                  placeholder="e.g. 1000"
                  onChange={(e) => setFilters((prev) => ({ ...prev, max_price: e.target.value }))}
                />
              </div>
            </div>
  
            {/* Quantity Range */}
            <div className="flex gap-2">
              <div className="flex flex-col w-1/2">
                <span className="text-sm font-bold">Min Qty</span>
                <Input
                  type="number"
                  value={filters.min_quantity}
                  placeholder="e.g. 10"
                  onChange={(e) => setFilters((prev) => ({ ...prev, min_quantity: e.target.value }))}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <span className="text-sm font-bold">Max Qty</span>
                <Input
                  type="number"
                  value={filters.max_quantity}
                  placeholder="e.g. 500"
                  onChange={(e) => setFilters((prev) => ({ ...prev, max_quantity: e.target.value }))}
                />
              </div>
            </div>
  
            {/* Buttons */}
            <div className="flex gap-2">
              <Button type="submit" className="w-full">
                Apply Filters
              </Button>
              <Button type="button" variant="secondary" className="w-full" onClick={handleClear}>
                Clear Filters
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    );
  };
  
  export default ProductFilters;
  