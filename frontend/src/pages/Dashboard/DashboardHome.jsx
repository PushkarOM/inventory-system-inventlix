import { useEffect, useState } from "react";
import axiosInstance from "../../helpers/axiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Boxes,
  Monitor,
  Phone,
  Tag,
  PenTool,
  Shirt,
} from "lucide-react"; // icons
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const DashboardHome = () => {
  const [summary, setSummary] = useState({ total: 0, quantity: 0 });
  const [categoryStats, setCategoryStats] = useState({});
  const [recentProducts, setRecentProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryIcons = {
    Electronics: Monitor,
    Stationery: PenTool,
    Apparel: Shirt,
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get("/inventory/allitems/");
        const items = res.data;

        // Calculating total items in Inventory
        const total = items.length;
        const quantity = items.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        );

        // Counting Category-wise Inventory Items
        const categoryCount = {};
        items.forEach((item) => {
          if (item.category in categoryCount) {
            categoryCount[item.category] += 1;
          } else {
            categoryCount[item.category] = 1;
          }
        });

        // Sorting by Date Added
        const sortedByDate = [...items].sort(
          (a, b) => new Date(b.date_added) - new Date(a.date_added)
        );

        // Product with Low Stock Level
        const lowStock = items.filter(
          (item) => item.stock_level.toLowerCase() === "low"
        );

        setLowStockProducts(lowStock);
        setRecentProducts(sortedByDate.slice(0, 5));
        setCategoryStats(categoryCount);
        setSummary({ total, quantity });
      } catch (err) {
        console.log("Inside Error : ");
        console.error("Error fetching summary:", err);
        toast.error("Unable to fetch product summary. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false when data is fetched or error occurs
      }
    };

    fetchSummary();
  }, []);

  // Format the data for the Pie chart
  const pieData = Object.entries(categoryStats).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  // Pie chart colors (you can customize the color palette)
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      {/* Error Toast */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeButton
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-md border border-gray-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Total Products</h2>
              {/* Show Skeleton while loading, otherwise display the actual value */}
              {loading ? (
                <Skeleton className="w-full h-10" />
              ) : (
                <p className="text-3xl font-bold text-gray-800">
                  {summary.total}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border border-gray-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Total Quantity</h2>
              {loading ? (
                <Skeleton className="w-full h-10" />
              ) : (
                <p className="text-3xl font-bold text-gray-800">
                  {summary.quantity}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Category-wise Product Count */}
        <Card className="col-span-full bg-white shadow-md border border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Category-wise Product Count
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {loading ? (
                <Skeleton className="w-full h-10" />
              ) : (
                <>
                  <div className="flex justify-center items-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={100}
                          labelLine={false}
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Render legends on the side */}
                  <div className="space-y-2">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                        <span className="text-sm font-medium">{entry.name}</span>
                        <span className="ml-2 text-sm text-gray-600">
                          {entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recently Added Products */}
        <div className="mt-8 max-h-64 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">
            Recently Added Products
          </h3>
          <div className="space-y-2">
            {loading ? (
              <Skeleton className="w-full h-10" /> // Placeholder skeleton for recent products
            ) : (
              recentProducts.map((product) => (
                <Card key={product.id} className="shadow-sm border">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{product.product_name}</p>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(product.date_added).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="mt-8 max-h-64 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4 text-red-600">
            Low Stock Alerts
          </h3>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <Card
                  key={product.id}
                  className="border-l-4 border-red-500 shadow-sm"
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{product.product_name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {product.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-red-600 font-semibold">
                      Restock Soon
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No low stock products.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
