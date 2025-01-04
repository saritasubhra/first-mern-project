import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { toast } from "react-toastify";

const URL = "http://localhost:8000/api/v1/contacts";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  async function fetchAllContacts() {
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
      setContacts(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const { token } = useAuth();

  useEffect(() => {
    fetchAllContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleContactDelete(id) {
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      fetchAllContacts();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (!contacts.length) return;

  return (
    <section className="admin-contacts-section">
      <h1>Admin Contact Data </h1>

      <div className="container  admin-users">
        {contacts.map((contact, index) => {
          const { fullname, email, message, _id } = contact;

          return (
            <div key={index}>
              <p>{fullname}</p>
              <p>{email}</p>
              <p>{message}</p>
              <button onClick={() => handleContactDelete(_id)}>delete</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AdminContacts;
