import { useState } from "react";

const URL = "http://localhost:8000/api/v1/contact";
function Contact() {
  const [contact, setContact] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    setContact({
      ...contact,
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
        body: JSON.stringify(contact),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setContact({
          fullname: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">contact us</h1>
      </div>

      <div className="container grid grid-two-cols">
        <div className="contact-img">
          <img src="/images/support.png" alt="we are always ready to help" />
        </div>

        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname">fullname</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                autoComplete="off"
                value={contact.fullname}
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
                value={contact.email}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="message">message</label>
              <textarea
                name="message"
                id="message"
                autoComplete="off"
                value={contact.message}
                onChange={handleInput}
                required
                cols="30"
                rows="6"
              ></textarea>
            </div>

            <div>
              <button type="submit">submit</button>
            </div>
          </form>
        </section>
      </div>

      <section className="mb-3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </section>
  );
}

export default Contact;
