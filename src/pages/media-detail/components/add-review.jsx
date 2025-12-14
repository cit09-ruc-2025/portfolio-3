import { Star } from "lucide-react";
import { useState } from "react";
import { Button, Card, CardBody, CardTitle, Form } from "react-bootstrap";
import { queryClient } from "../../../context/query-client-provider";
import { useAddReview } from "../../../hooks/queries/review";

const AddReview = ({ mediaId, rating, review, setIsEdit }) => {
  const [formData, setFormData] = useState({
    rating: rating || 0,
    review: review || "",
  });

  const [errors, setErrors] = useState({});

  const { mutate: addReview, isPending } = useAddReview(mediaId);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (formData.rating < 1) {
      newErrors.rating = "Rating is required";
    }

    if (formData.rating > 10) {
      newErrors.rating = "Rating cannot exceed 10";
    }

    if (formData.review?.length > 250) {
      newErrors.password = "Review cannot exceed 250 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addReview(formData, {
      onSuccess: () => {
        if (setIsEdit) {
          setIsEdit(false);
        }
        queryClient.invalidateQueries({ queryKey: ["media-reviews"] });
      },
      onError: (error) => {
        setErrors(error?.errors);
      },
    });
  };

  return (
    <Card style={{ padding: "16px 20px", gap: "12px" }}>
      {!rating && (
        <CardTitle style={{ fontSize: "16px" }}>Add Your Review</CardTitle>
      )}
      <CardBody style={{ padding: "0" }}>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-2">
            <Form.Group>
              <div className="d-flex gap-1">
                {Array.from({ length: 10 }).map((_, index) => {
                  const starValue = index + 1;

                  return (
                    <Star
                      key={starValue}
                      size={22}
                      style={{ cursor: "pointer" }}
                      fill={starValue <= formData.rating ? "#f5c518" : "none"}
                      stroke={starValue <= formData.rating ? "#f5c518" : "#ccc"}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, rating: starValue }))
                      }
                    />
                  );
                })}
              </div>

              {errors?.rating && (
                <Form.Text type="invalid">{errors.rating}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="review">
              <Form.Label>Review</Form.Label>
              <Form.Control
                name="review"
                as="textarea"
                rows={4}
                placeholder="Share your review..."
                value={formData.review}
                onChange={handleChange}
                isInvalid={!!errors?.review}
              />

              {errors?.review && (
                <Form.Text type="invalid">{errors.review}</Form.Text>
              )}
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                type="submit"
                className="primary-button"
                style={{ width: "fit-content" }}
                disabled={isPending}
              >
                Submit
              </Button>
              {setIsEdit && (
                <Button
                  className="primary-button"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddReview;
