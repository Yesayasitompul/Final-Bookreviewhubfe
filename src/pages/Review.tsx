import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "../utils/AuthProvider";
import axios from "../utils/AxiosInstance";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  FilterOutlined, 
  CloseOutlined,
  SaveOutlined,
  BookOutlined,
  TagOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  MessageOutlined,
  LoadingOutlined
} from "@ant-design/icons";

// Types
type ReviewType = {
  id: number;
  ulasan: string;
  book_id: number;
  created_at: string;
  updated_at: string;
  book: {
    id: number;
    title: string;
    cover_image?: string;
    category: {
      id: number;
      name: string;
    };
  };
};

type BookType = {
  id: number;
  title: string;
};

type CreateReviewDTO = {
  bookId: number;
  ulasan: string;
};

// API Functions
const fetchReviews = async (token: string | null) => {
  return await axios.get<ReviewType[]>("/api/review", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const fetchBookReviews = async (bookId: number, token: string | null) => {
  return await axios.get<ReviewType[]>(`/api/review/book/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const fetchBooks = async (token: string | null) => {
  return await axios.get<BookType[]>("/api/books", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const createReview = async (review: CreateReviewDTO, token: string | null) => {
  return await axios.post("/api/review", review, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const updateReview = async (id: number, review: CreateReviewDTO, token: string | null) => {
  return await axios.put(`/api/review/${id}`, review, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const deleteReview = async (id: number, token: string | null) => {
  return await axios.delete(`/api/review/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Components
const ReviewCard = ({ 
  review, 
  onEdit, 
  onDelete 
}: { 
  review: ReviewType; 
  onEdit: (review: ReviewType) => void; 
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-4 shadow-sm hover:shadow-md transition-shadow max-w-xl mx-auto">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div>
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">{review.book.title}</h2>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <TagOutlined className="text-purple-500" />
            <span>{review.book.category?.name || "Uncategorized"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ClockCircleOutlined className="text-blue-500" />
            <span>{new Date(review.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
        {review.book.cover_image && (
          <img
            src={review.book.cover_image}
            alt={review.book.title}
            className="w-20 h-24 object-cover rounded-md shadow-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x200?text=No+Image';
            }}
          />
        )}
        {!review.book.cover_image && (
          <div className="w-20 h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
            <BookOutlined className="text-gray-400 text-xl" />
          </div>
        )}
      </div>
      <div className="text-gray-700 dark:text-gray-300 text-sm mb-4 border-t border-gray-100 dark:border-gray-700 pt-4 leading-relaxed">
        <div className="flex gap-2 items-start">
          <MessageOutlined className="text-purple-500 mt-1" />
          <p>{review.ulasan}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(review)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
        >
          <EditOutlined /> Edit
        </button>
        <button
          onClick={() => onDelete(review.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
        >
          <DeleteOutlined /> Delete
        </button>
      </div>
    </div>
  );
};

const ReviewForm = ({
  review,
  onSubmit,
  onCancel
}: {
  review: Partial<ReviewType> | null;
  onSubmit: (data: CreateReviewDTO) => void;
  onCancel: () => void;
}) => {
  const { getToken } = useAuth();
  const [formData, setFormData] = useState<CreateReviewDTO>({
    bookId: review?.book_id || 0,
    ulasan: review?.ulasan || ""
  });

  const { data: booksData, isLoading } = useQuery({
    queryKey: ["booksList"],
    queryFn: () => fetchBooks(getToken())
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "bookId" ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-4 shadow-md max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <MessageOutlined className="text-purple-500" />
          {review ? "Edit Review" : "Add New Review"}
        </h2>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <CloseOutlined />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="bookId">
            <BookOutlined className="mr-1.5 text-purple-500" /> Book
          </label>
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-2">
              <LoadingOutlined className="text-blue-500" spin /> Loading books...
            </div>
          ) : (
            <select
              id="bookId"
              name="bookId"
              value={formData.bookId || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select a book</option>
              {booksData?.data.map(book => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="ulasan">
            <MessageOutlined className="mr-1.5 text-purple-500" /> Review
          </label>
          <textarea
            id="ulasan"
            name="ulasan"
            value={formData.ulasan}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            required
            placeholder="Write your review here..."
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2 transition-colors"
          >
            <SaveOutlined /> {review ? "Update Review" : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

const FilterPanel = ({
  selectedBookId,
  setSelectedBookId
}: {
  selectedBookId: number | null;
  setSelectedBookId: (id: number | null) => void;
}) => {
  const { getToken } = useAuth();
  const { data: booksData, isLoading } = useQuery({
    queryKey: ["booksList"],
    queryFn: () => fetchBooks(getToken())
  });

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-5 shadow-sm max-w-xl mx-auto">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <label className="flex text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5 items-center gap-2">
            <FilterOutlined className="text-purple-500" /> Filter by Book
          </label>
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-1">
              <LoadingOutlined className="text-blue-500" spin /> Loading books...
            </div>
          ) : (
            <select
              value={selectedBookId || ""}
              onChange={(e) => setSelectedBookId(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Reviews</option>
              {booksData?.data.map(book => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          )}
        </div>
        {selectedBookId && (
          <button
            onClick={() => setSelectedBookId(null)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 self-end transition-colors"
          >
            <CloseOutlined /> Clear Filter
          </button>
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center max-w-xl mx-auto shadow-sm">
      <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20">
        <MessageOutlined className="text-purple-500 dark:text-purple-400 text-3xl" />
      </div>
      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">No reviews found</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">You haven't added any book reviews yet. Share your thoughts about books you've read.</p>
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm flex items-center gap-2 mx-auto transition-colors"
      >
        <PlusOutlined /> Add Your First Review
      </button>
    </div>
  );
};

// Main Component
const Review = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewType | null>(null);

  // Queries
  const { data: allReviewsData, isLoading: isLoadingAllReviews, isError: isErrorAllReviews } = useQuery({
    queryKey: ["reviewsList"],
    queryFn: () => fetchReviews(getToken()),
    enabled: !selectedBookId
  });

  const { data: bookReviewsData, isLoading: isLoadingBookReviews, isError: isErrorBookReviews } = useQuery({
    queryKey: ["bookReviews", selectedBookId],
    queryFn: () => fetchBookReviews(selectedBookId as number, getToken()),
    enabled: !!selectedBookId
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (newReview: CreateReviewDTO) => createReview(newReview, getToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewsList"] });
      if (selectedBookId) {
        queryClient.invalidateQueries({ queryKey: ["bookReviews", selectedBookId] });
      }
      setShowForm(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, review }: { id: number; review: CreateReviewDTO }) => 
      updateReview(id, review, getToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewsList"] });
      if (selectedBookId) {
        queryClient.invalidateQueries({ queryKey: ["bookReviews", selectedBookId] });
      }
      setShowForm(false);
      setEditingReview(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteReview(id, getToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewsList"] });
      if (selectedBookId) {
        queryClient.invalidateQueries({ queryKey: ["bookReviews", selectedBookId] });
      }
    }
  });

  // Event Handlers
  const handleAddClick = () => {
    setEditingReview(null);
    setShowForm(true);
  };

  const handleEditClick = (review: ReviewType) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormSubmit = (data: CreateReviewDTO) => {
    if (editingReview) {
      updateMutation.mutate({ id: editingReview.id, review: data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  // Determine which reviews to show
  const reviews = selectedBookId ? bookReviewsData?.data : allReviewsData?.data;
  const isLoading = selectedBookId ? isLoadingBookReviews : isLoadingAllReviews;
  const isError = selectedBookId ? isErrorBookReviews : isErrorAllReviews;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <MessageOutlined className="text-white text-2xl" />
              <h1 className="text-2xl font-bold text-white">
                My Book Reviews
              </h1>
            </div>
            {!showForm && (
              <button
                onClick={handleAddClick}
                className="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <PlusOutlined /> Add Review
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        {showForm ? (
          <ReviewForm
            review={editingReview || null}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
            <FilterPanel
              selectedBookId={selectedBookId}
              setSelectedBookId={setSelectedBookId}
            />

            {isLoading ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center max-w-xl mx-auto">
                <LoadingOutlined className="text-purple-500 text-3xl mb-3" spin />
                <p className="text-gray-600 dark:text-gray-300">Loading reviews...</p>
              </div>
            ) : isError ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-xl mx-auto">
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md text-center">
                  <p>Failed to load reviews. Please try again later.</p>
                </div>
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div>
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            ) : (
              <EmptyState onAdd={handleAddClick} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Review;