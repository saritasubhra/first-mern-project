import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { toast } from "react-toastify";

const URL = "http://localhost:8000/api/v1/auth/signup";

function Register() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (res.ok) {
        return toast.error(data.message);
      }
      localStorage.setItem("merntoken", data.token);
      setToken(data.token);
      setUser({
        fullname: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img
                src="/images/register.png"
                alt="a girl is trying to do registration"
                width="500"
                height="500"
              />
            </div>

            <div className="registration-form">
              <h1 className="main-heading mb-3">registration form</h1>
              <br />

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullname">fullname</label>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="fullname"
                    id="fullname"
                    required
                    autoComplete="off"
                    value={user.fullname}
                    onChange={handleInput}
                  />
                </div>

                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="enter your email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>

                <div>
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>

                <div>
                  <label htmlFor="passwordConfirm">passwordConfirm</label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="passwordConfirm"
                    id="passwordConfirm"
                    required
                    autoComplete="off"
                    value={user.passwordConfirm}
                    onChange={handleInput}
                  />
                </div>

                <br />
                <button type="submit" className="btn btn-submit">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Register;
