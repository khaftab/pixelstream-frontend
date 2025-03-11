import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageRange } from "@/lib/getPaginationRange";

type PaginationProps = {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  limit?: number;
};

// Modified pagination component
export function PaginationControl({
  totalCount,
  currentPage,
  onPageChange,
  limit = 4, // Make limit configurable with default value
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / limit);

  // Don't show pagination if there's only one page or no items
  if (totalCount <= limit || totalPages <= 1) {
    return null;
  }

  const pageRange = getPageRange(currentPage, totalPages);
  // console.log(pageRange, currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap gap-1">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            className={`${currentPage === 1 ? "opacity-50 pointer-events-none" : ""} 
                       shrink-0`} // Added shrink-0 to prevent button from shrinking
          />
        </PaginationItem>

        {pageRange.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof page === "number") handlePageChange(page);
                }}
                className="min-w-[2rem] justify-center" // Ensure consistent width
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            className={`${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
                       shrink-0`} // Added shrink-0 to prevent button from shrinking
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
