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
  import { useState, useEffect } from "react";
  import axiosInstance from "../../helpers/axiosInstance";
  
  const UpdateFormModel = ({ isOpen, onClose, onUpdated, product }) => {
    // Initialize formData from the product prop when modal opens
    const [formData, setFormData] = useState({
      code: "",
      product_name: "",
      price: "",
      quantity: "",
      category: "",
      image: null,
    });
  
    // Pre-populating form data when the product prop changes (useEffect)
    useEffect(() => {
      if (product) {
        setFormData({
          code: product.code || "",
          product_name: product.product_name || "",
          price: product.price || "",
          quantity: product.quantity || "",
          category: product.category || "",
          image: null,
        });
      }
    }, [product]);
  
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
  
    // Handle submit for updating the product
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
          if (val) data.append(key, val);
        });
  
        // Updating the product using PUT request
        await axiosInstance.put(`/inventory/items/${product.id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        await onUpdated(); // Callback when the product is updated
        onClose(); // Close the modal after successful update
      } catch (error) {
        console.error("Update product error:", error);
      }
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update {product?.product_name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">SKU / Code</Label>
              <Input
                name="code"
                value={formData.code}
                onChange={handleChange}
              />
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="product_name">Product Name</Label>
              <Input
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
              />
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                name="quantity"
                type="number"
                value={formData.quantity}
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
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default UpdateFormModel;
  