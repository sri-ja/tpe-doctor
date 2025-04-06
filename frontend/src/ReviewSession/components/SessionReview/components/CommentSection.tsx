import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Mock implementation of submitComment function
const submitComment = async (sessionId: string, commentData: { text: string; type: string; reviewedBy: string }) => {
  // Simulate API call
  return new Promise((resolve) => setTimeout(resolve, 1000));
};
// Removed useNavigate and usePatients as finish review logic is moved to parent
// import { useNavigate } from "react-router-dom";
// import { usePatients } from "../../../../context/ReviewSessionContext";

// 1. Define interface for comment data
interface CommentData {
  id: number;
  timestamp: string;
  type: string;
  text: string;
}

// 2. Type mockComments array
// TODO: Fetch actual comments
const mockComments: CommentData[] = [
  { id: 1, timestamp: "Jan 15, 2024 - 10:45 AM", type: "Post-Session", text: "The exercise was challenging but manageable. I felt more confident with each step and noticed improvement in my balance." }
];

// 3. Define Props interface
interface Props {
  patientId: string;
  sessionId: string;  // Add sessionId prop
  onCommentSubmitted?: () => void;  // Optional callback for parent component
}

// 4. Type CommentSection component
const CommentSection: React.FC<Props> = ({ patientId, sessionId, onCommentSubmitted }) => {
  // 5. Type comment state
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Removed navigate and completeReview from here
  // const navigate = useNavigate();
  // const { completeReview } = usePatients();

  // 6. Type event parameter in handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitComment(sessionId, {
        text: comment,
        type: "Doctor Review",
        reviewedBy: "current-doctor-id", // Replace with actual doctor ID from auth context
      });

      setComment(""); // Clear comment box after successful submission
      if (onCommentSubmitted) {
        onCommentSubmitted(); // Notify parent component
      }
      
      // Show success feedback
      toast.success("Comment submitted successfully");
    } catch (err) {
      setError("Failed to submit comment. Please try again.");
      console.error('Error submitting comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Removed handleFinishReview - handled in parent SessionReview.jsx

  const comments = mockComments; // Use mock data for now

  return (
    // Use fragment as parent SessionReview handles spacing with space-y
    <>
      {/* Standardized Patient Comments Section */}
      <section aria-labelledby="comments-title">
        <h2 id="comments-title" className="text-lg font-semibold text-gray-700 mb-3">
          Patient Comments
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
          {comments.length > 0 ? (
            comments.map((c: CommentData) => ( // 7. Type c in map
              // Standardized comment card
              <div key={c.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-wrap gap-2 justify-between items-center mb-1">
                  {/* Standardized timestamp */}
                  <time className="text-sm text-gray-600">
                    {c.timestamp}
                  </time>
                  {/* Standardized type badge */}
                  <span className="px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                    {c.type}
                  </span>
                </div>
                {/* Standardized comment text */}
                <p className="text-sm text-gray-800">
                  {c.text}
                </p>
              </div>
            ))
          ) : (
            // Added empty state
            <p className="text-sm text-gray-500 text-center py-4">No patient comments available for this session.</p>
          )}
        </div>
      </section>

      {/* Standardized Add Comment Section */}
      <section aria-labelledby="add-comment-title">
        <h2 id="add-comment-title" className="text-lg font-semibold text-gray-700 mb-3">
          Add Your Comment
        </h2>
        {/* Standardized form container */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
          {error && (
            <div className="text-red-600 text-sm mb-2">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="comment-input" className="sr-only">Add Your Comment</label> {/* Added label for accessibility */}
            {/* Standardized textarea */}
            <textarea
              id="comment-input"
              rows={4} // Slightly larger textarea
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your comment, observations, or notes..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required // Make comment required if submitting
              disabled={isSubmitting}
            />
          </div>
          {/* Standardized button */}
          <div className="flex justify-end"> {/* Align button to the right */}
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Submit comment"
              disabled={!comment.trim() || isSubmitting} // Disable if comment is empty or submitting
            >
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>
            {/* Removed Finish Review button */}
          </div>
        </form>
      </section>
    </>
  );
};

export default CommentSection;
