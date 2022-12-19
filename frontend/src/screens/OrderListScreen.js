import React, { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, LinkContainer } from "react-router-bootstrap";
import { listOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { loading, error, orders } = orderList;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }

  }, [dispatch, navigate,userInfo]);
  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders ? (
        <Table striped bordered responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                      order.paidAt
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                      order.deliveredAt
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}/`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h1>Not Working</h1>
      )}
    </div>
  );
};

export default OrderListScreen;
