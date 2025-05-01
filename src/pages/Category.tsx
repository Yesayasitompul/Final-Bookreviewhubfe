// Category.tsx - Improved layout component
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthProvider";
import axios from "../utils/AxiosInstance";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import CategoryDetail from "./CategoryDetail";
import { PlusOutlined, BookOutlined, LoadingOutlined } from "@ant-design/icons";

export type CategoryType = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};

const fetchCategoryList = async (
  token: string | null,
  page = 1,
  limit = 10
) => {
  return await axios.get<CategoryType[]>(
    `/api/category?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};

const Category = () => {
  const { getToken } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { 
    data: categoryData, 
    refetch: refetchCategories,
    isLoading,
    isError 
  } = useQuery({
    queryKey: ["categoryList", currentPage],
    queryFn: () => fetchCategoryList(getToken(), currentPage)
  });

  const handleAddNewClick = () => {
    setSelectedCategory(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  const handleEditClick = (category: CategoryType) => {
    setSelectedCategory(category);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const handleViewClick = (category: CategoryType) => {
    setSelectedCategory(category);
    setIsFormOpen(false);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleCloseDetail = () => {
    setSelectedCategory(null);
  };

  const handleFormSubmit = () => {
    refetchCategories();
    setIsFormOpen(false);
  };

  const handleDeleteSuccess = () => {
    refetchCategories();
    setSelectedCategory(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BookOutlined className="text-white text-2xl" />
              <h1 className="text-2xl font-bold text-white">
                Categories
              </h1>
            </div>
            <button
              onClick={handleAddNewClick}
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors duration-200 shadow-sm"
            >
              <PlusOutlined /> Add Category
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <LoadingOutlined className="text-blue-500 text-3xl" />
              <span className="ml-2 text-gray-600 dark:text-gray-300 font-medium">Loading categories...</span>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md mb-4">
              <p>Failed to load categories. Please try again later.</p>
            </div>
          )}

          {/* Empty State */}
          {categoryData?.data.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <BookOutlined className="text-gray-400 text-4xl mb-3" />
              <h3 className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-2">No categories found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Start by creating your first category</p>
              <button
                onClick={handleAddNewClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md font-medium inline-flex items-center gap-2"
              >
                <PlusOutlined /> Create Category
              </button>
            </div>
          )}

          {/* Category List */}
          {categoryData && categoryData.data.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-md">
              <CategoryList
                categories={categoryData.data}
                onEdit={handleEditClick}
                onView={handleViewClick}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Category Form Modal */}
      {isFormOpen && (
        <CategoryForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          category={isEditMode ? selectedCategory : null}
          isEditMode={isEditMode}
        />
      )}

      {/* Category Detail Modal */}
      {selectedCategory && !isFormOpen && (
        <CategoryDetail
          category={selectedCategory}
          onClose={handleCloseDetail}
          onEdit={() => handleEditClick(selectedCategory)}
          onDelete={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default Category;