// Books.tsx - Improved layout component
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "../utils/AuthProvider";
import axios from "../utils/AxiosInstance";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import BookDetail from "./BookDetail";
import { PlusOutlined, BookOutlined, LoadingOutlined, ReadOutlined } from "@ant-design/icons";

export type BookType = {
  id: number;
  title: string;
  author: string;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type CategoryType = {
  id: number;
  name: string;
};

const fetchBookList = async (token: string | null, page = 1, limit = 10) => {
  return await axios.get<BookType[]>(`/api/books?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const fetchCategories = async (token: string | null) => {
  return await axios.get<CategoryType[]>("/api/category", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const Books = () => {
  const { getToken } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { 
    data: bookData, 
    refetch: refetchBooks,
    isLoading: isLoadingBooks,
    isError: isErrorBooks 
  } = useQuery({
    queryKey: ["bookList", currentPage],
    queryFn: () => fetchBookList(getToken(), currentPage)
  });

  const { 
    data: categoryData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories 
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(getToken())
  });

  const handleAddNewClick = () => {
    setSelectedBook(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  const handleEditClick = (book: BookType) => {
    setSelectedBook(book);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const handleViewClick = (book: BookType) => {
    setSelectedBook(book);
    setIsFormOpen(false);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
  };

  const handleFormSubmit = () => {
    refetchBooks();
    setIsFormOpen(false);
  };

  const handleDeleteSuccess = () => {
    refetchBooks();
    setSelectedBook(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isLoading = isLoadingBooks || isLoadingCategories;
  const isError = isErrorBooks || isErrorCategories;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <ReadOutlined className="text-white text-2xl" />
              <h1 className="text-2xl font-bold text-white">
                My Books Collection
              </h1>
            </div>
            <button
              onClick={handleAddNewClick}
              className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors duration-200 shadow-sm"
              disabled={isLoading}
            >
              <PlusOutlined /> Add Book
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <LoadingOutlined className="text-green-500 text-3xl" />
              <span className="ml-2 text-gray-600 dark:text-gray-300 font-medium">Loading books collection...</span>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md mb-4">
              <p>Failed to load books or categories. Please try again later.</p>
            </div>
          )}

          {/* Empty State */}
          {bookData?.data.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <BookOutlined className="text-gray-400 text-4xl mb-3" />
              <h3 className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-2">Your book collection is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Start by adding your first book</p>
              <button
                onClick={handleAddNewClick}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md font-medium inline-flex items-center gap-2"
                disabled={isLoadingCategories}
              >
                <PlusOutlined /> Add Your First Book
              </button>
            </div>
          )}

          {/* Book List */}
          {bookData && bookData.data.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-md">
              <BookList
                books={bookData.data}
                onEdit={handleEditClick}
                onView={handleViewClick}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Book Form Modal */}
      {isFormOpen && (
        <BookForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          book={isEditMode ? selectedBook : null}
          isEditMode={isEditMode}
          categories={categoryData?.data || []}
        />
      )}

      {/* Book Detail Modal */}
      {selectedBook && !isFormOpen && (
        <BookDetail
          book={selectedBook}
          onClose={handleCloseDetail}
          onEdit={() => handleEditClick(selectedBook)}
          onDelete={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default Books;