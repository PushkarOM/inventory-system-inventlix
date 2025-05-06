import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, totalPages }) => {
  const navigate = useNavigate();

  const goToPage = (newPage) => {
    navigate(`?page=${newPage}`);
  };

  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button
        variant="outline"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>
      <span className="text-sm font-medium mt-2">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
