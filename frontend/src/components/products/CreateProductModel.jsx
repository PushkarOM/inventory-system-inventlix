import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import axiosInstance from "../../helpers/axiosInstance";

const CreateProductModal = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    code: "",
    product_name: "",
    price: "",
    quantity: "",
    category: "Electronics",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };


  // Function to Call the POST API Endpoint to create a New Item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      
      Object.entries(formData).forEach(([key, val]) => {
        if (val) data.append(key, val);
      });
      

      for (let [key, val] of data.entries()) {
        console.log(key, val);
      }

      await axiosInstance.post("/inventory/items/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onCreated();
      onClose();
    } catch (error) {
      console.error("Create product error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">SKU / Code</Label>
            <Input name="code" required onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product_name">Product Name</Label>
            <Input name="product_name" required onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              name="price"
              type="number"
              required
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              name="quantity"
              type="number"
              required
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Apparel">Apparel</SelectItem>
                <SelectItem value="Stationery">Stationery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image (optional)</Label>
            <Input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
