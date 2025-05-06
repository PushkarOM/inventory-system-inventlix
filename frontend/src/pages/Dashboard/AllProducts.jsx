import { useEffect, useState } from "react";
import axiosInstance from "../../helpers/axiosInstance";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Pagination from "../../components/products/Pagination";
import CreateProductModal from "../../components/products/createProductModel";
import {
  Package,
  Boxes,
  Monitor,
  Phone,
  Tag,
  PenTool,
  Shirt,
} from "lucide-react";

const categoryIcon = {
  Electronics: <Monitor className="h-8 w-8 text-gray-600" />,
  Apparel: <Shirt className="h-8 w-8 text-gray-600" />,
  Accessories: <Phone className="h-8 w-8 text-gray-600" />,
  Furniture: <Package className="h-8 w-8 text-gray-600" />,
  Stationery: <PenTool className="h-8 w-8 text-gray-600" />,
  Default: <Tag className="h-8 w-8 text-gray-600" />, // Default icon if no category matches
};

const stockLevelColor = {
  low: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-green-100 text-green-800",
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get("page")) || 1;

  const pageSize = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching page:", page);
        setLoading(true);
        const res = await axiosInstance.get(`/inventory/items/?page=${page}`);
        setProducts(res.data.results);
        setTotalCount(res.data.count);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-white hover:text-black hover:outline transition"
        >
          Create New
        </button>
      </div>
      {loading ? (
        <Skeleton className="w-full h-40" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:shadow-md hover:scale-105 transition duration-150 ease-in-out"
              onClick={() => navigate(`/dashboard/product/${product.id}`)}
            >
              <CardContent className="p-4 space-y-2">
                {/* Image or Category Icon */}
                <div className="h-40 w-full flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.product_name}
                      className="h-full w-auto object-contain"
                    />
                  ) : (
                    categoryIcon[product.category] || categoryIcon.Default
                  )}
                </div>

                {/* Name, Category, Quantity, Price */}
                <h2 className="font-semibold text-lg">
                  {product.product_name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Category: {product.category}
                </p>
                <p className="text-sm">Qty: {product.quantity}</p>
                <p className="text-sm">Price: ₹{product.price}</p>

                {/* Stock Level Badge */}
                <Badge
                  className={`${
                    stockLevelColor[product.stock_level] ||
                    "bg-gray-100 text-gray-700"
                  } hover:scale-105 transition duration-150 ease-in-out`}
                >
                  Stock: {product.stock_level}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} />

      <CreateProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={() => {
          setLoading(true);
          // trigger refetch
          axiosInstance.get(`/inventory/items/?page=${totalPages}`).then((res) => {
            setProducts(res.data.results);
            setTotalCount(res.data.count);
            setLoading(false);
          });
        }}
      />
    </div>
  );
};

export default AllProducts;
