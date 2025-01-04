import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { toast } from "react-toastify";

const URL = "http://localhost:8000/api/v1/users";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  async function fetchAllUsers() {
    try {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }
      setUsers(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const { token } = useAuth();

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!users.length) return;

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Users Data </h1>
      </div>
      <div className="container  admin-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser, index) => {
              return (
                <tr key={index}>
                  <td>{curUser.fullname}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.email}</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminUsers;
