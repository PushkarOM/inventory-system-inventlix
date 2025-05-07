import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-purple-600 text-white shadow-md">
      <h1 className="text-2xl font-bold">Inventory Management System</h1>
      <Button variant="outline" className="text-black border-white hover:scale-110 transition duration-150 ease-in-out" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
};

export default Header;
