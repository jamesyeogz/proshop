import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Image, ListGroup, Row, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product_id = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(
        product_id.id,
        rating,
        comment
    ))
  };
  useEffect(() => {
      if(successProductReview){
          setRating(0)
          setComment('')
          dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
      }
    dispatch(listProductDetails(product_id.id));
  }, [dispatch, product_id.id, successProductReview]);

  const addToCartHandler = () => {
    console.log("Add to cart: ", product_id.id);
    navigate(`/cart/${product_id.id}?qty=${qty}`);
  };
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} review`}
                    color={"f8e825"}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color="#f8e825" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Write a Review</h4>
                  {loadingProductReview && <Loader/>}
                  {successProductReview && <Message variant='success'>Review Submitted</Message>}
                  {errorProductReview &&<Message variant='danger'>{errorProductReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">1 - Not Good</option>
                          <option value="3">3 - Fair</option>
                          <option value="4">4 - Good</option>
                          <option value="5">5 - Perfect</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button className="my-2"
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >Submit</Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please
                      <Link to="/login"> Login </Link>
                      to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}

      {product.name}
    </div>
  );
};

export default ProductScreen;
