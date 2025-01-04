import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const URL = "http://localhost:8000/api/v1/users";

function UserUpdate() {
  const { token } = useAuth();
  const { id } = useParams();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
  });

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInput(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function fetchUser() {
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }
      setUser({ fullname: data.data.fullname, email: data.data.email });
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        return toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update User Data</h1>
      </div>

      <div className="container grid grid-two-cols">
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname">fullname</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                autoComplete="off"
                value={user.fullname}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}

export default UserUpdate;
