import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../helpers/axiosInstance";
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
import {
  Package,
  Boxes,
  Monitor,
  Phone,
  Tag,
  PenTool,
  Shirt,
} from "lucide-react";
import UpdateFormModel from "@/components/products/UpdateProductModel";


const categoryIcon = {
  Electronics: <Monitor className="h-20 w-20 text-gray-600" />,
  Apparel: <Shirt className="h-20 w-20 text-gray-600" />,
  Accessories: <Phone className="h-20 w-20 text-gray-600" />,
  Furniture: <Package className="h-20 w-20 text-gray-600" />,
  Stationery: <PenTool className="h-20 w-20 text-gray-600" />,
  Default: <Tag className="h-20 w-20 text-gray-600" />,
};

const stockLevelColor = {
  low: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-green-100 text-green-800",
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/inventory/items/${id}/`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/inventory/items/${id}/`);
      navigate("/products");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };



  if (!product) {
    return <div className="p-6 text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Product Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image or Category Icon */}
        <div className="flex items-center justify-center bg-gray-100 rounded-md h-80">
          {product.image ? (
            <img
              src={product.image}
              alt={product.product_name}
              className="max-h-full object-contain"
            />
          ) : (
            categoryIcon[product.category] || categoryIcon.Default
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{product.product_name}</h2>
            <p className="text-sm text-muted-foreground">
              Category: {product.category}
            </p>
          </div>

          <p className="text-sm">SKU: {product.code || "N/A"}</p>
          <p className="text-sm">Price: ₹{product.price}</p>
          <p className="text-sm">Quantity: {product.quantity}</p>

          <Badge
            className={`${
              stockLevelColor[product.stock_level] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            Stock Level: {product.stock_level}
          </Badge>

          <div className="flex space-x-4 pt-4">
            <Button
              variant="default"
                onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Edit
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete{" "}
                    <strong>{product.product_name}</strong>? This action cannot
                    be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>



      <UpdateFormModel
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpdated={async () => {
            setLoading(true);
            try {
              const res = await axiosInstance.get(`/inventory/items/${product.id}/`);
              setProduct(res.data);
            } catch (error) {
              console.error("Failed to refetch updated product:", error);
            }
            finally{
                setLoading(false);
            }
          }}
        product={product}
      />
    </div>
  );
};

export default ProductDetail;
