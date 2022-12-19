import React, { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, LinkContainer } from "react-router-bootstrap";
import { deleteUser, listUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const userLogin = useSelector((state) => state.userLogin);
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const { userInfo } = userLogin;
  const { loading, error, users } = userList;
  const deleteHandler = (id) => {
    if (window.confirm("Are You sure You want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }

  }, [dispatch, navigate,userInfo, successDelete]);
  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : users ? (
        <Table striped bordered responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      {" "}
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    {" "}
                    <i className="fas fa-trash"></i>
                  </Button>
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

export default UserListScreen;
