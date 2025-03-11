export function getPageRange(currentPage: number, totalPages: number): (number | string)[] {
  const FIXED_LENGTH = 5;

  if (totalPages <= FIXED_LENGTH) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 3, "...", totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}
// Page 1 → [1, 2, 3, '...', 13]

// Page 2 → [1, 2, 3, '...', 13]

// Page 3 → [2, 3, 4, '...', 13]

// Page 7 → [6, 7, 8, '...', 13]
