import { useEffect, useState , useMemo} from "react";
import axiosInstance from "../../helpers/axiosInstance";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
  } from "@/components/ui/alert-dialog";  
import Pagination from "../../components/products/Pagination";
import CreateProductModal from "../../components/products/createProductModel";
import SearchBar from "../../components/products/SearchBar";
import ProductFilters from "../../components/products/ProductFilters";
import {
  Package,
  Boxes,
  Monitor,
  Phone,
  Tag,
  PenTool,
  Shirt,
  Trash2,
  Search
} from "lucide-react";


// Icons Mapping for Different Categories
const categoryIcon = {
  Electronics: <Monitor className="h-8 w-8 text-gray-600" />,
  Apparel: <Shirt className="h-8 w-8 text-gray-600" />,
  Accessories: <Phone className="h-8 w-8 text-gray-600" />,
  Furniture: <Package className="h-8 w-8 text-gray-600" />,
  Stationery: <PenTool className="h-8 w-8 text-gray-600" />,
  Default: <Tag className="h-8 w-8 text-gray-600" />,
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

  // building query every time search parameter changes
  const queryUrl = useMemo(() => {
    const category = searchParams.get("category");
    const stock_level = searchParams.get("stock_level");
    const search = searchParams.get("search");
    const min_price = searchParams.get("min_price");
    const max_price = searchParams.get("max_price");
    const min_quantity = searchParams.get("min_quantity");
    const max_quantity = searchParams.get("max_quantity");
  
    let query = `/inventory/items/?page=${page}`;
    if (category) query += `&category=${category}`;
    if (stock_level) query += `&stock_level=${stock_level}`;
    if (search) query += `&search=${search}`;
    if (min_price) query += `&price__gte=${min_price}`;
    if (max_price) query += `&price__lte=${max_price}`;
    if (min_quantity) query += `&quantity__gte=${min_quantity}`;
    if (max_quantity) query += `&quantity__lte=${max_quantity}`;
    
    return query;
  }, [searchParams, page]);
  

  // fetching the product details
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(queryUrl);
        console.log(res.data);
        setProducts(res.data.results);
        setTotalCount(res.data.count);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [queryUrl]);

  
  

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/inventory/items/${id}/`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">All Products</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-black h-10 w-10 flex justify-center items-center rounded-lg">
            <Search className="h-5 w-5 text-white" />
          </div>
          <SearchBar />
          <ProductFilters />
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white hover:bg-white hover:text-black hover:outline transition"
        >
          Create New
        </Button>
      </div>

      {/* Product Grid or Loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: pageSize }).map((_, idx) => (
            <Skeleton key={idx} className="w-full h-52" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              onClick={(e) => {
                if (e.target.closest("button")) return;
                navigate(`/products/${product.id}`);
              }}
              className="cursor-pointer hover:shadow-md hover:scale-105 transition duration-150 ease-in-out"
            >
              <CardContent className="p-4 space-y-2">
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
                <h2 className="font-semibold text-lg">
                  {product.product_name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Category: {product.category}
                </p>
                <p className="text-sm">Qty: {product.quantity}</p>
                <p className="text-sm">Price: ₹{product.price}</p>

                <div className="flex justify-between items-center mt-2">
                  <Badge
                    className={`${
                      stockLevelColor[product.stock_level] || "bg-gray-100 text-gray-700"
                    } hover:scale-105 transition`}
                  >
                    Stock: {product.stock_level}
                  </Badge>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete <strong>{product.product_name}</strong>? This action is permanent.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        searchParams={searchParams}
      />

      {/* Create Modal */}
      <CreateProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={() => {
          setLoading(true);
          axiosInstance.get(queryUrl).then((res) => {
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
