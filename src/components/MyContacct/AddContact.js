import React, { useState } from "react";
import "./AddContact.css";
import Card from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addData } from "../../Redux/Action";

const AddContact = () => {
  const contacts = useSelector((state) => state.Reducer.contacts);
  const contactDispatch = useDispatch();
  const navigate = useNavigate();
  console.log(contacts);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    //validation
    let id = 0;
    if (contacts.length !== 0) {
      id = contacts.length + 1;
    }
    const contactData = {
      id: id,
      name: name,
      email: email,
      number: number,
    };
    addContactInfo(contactData);
    toast.success("Contact Added Successfully");
    navigate("/");
  };
  const addContactInfo = async (contactData) => {
    await fetch(
      "https://contact-app-5418e-default-rtdb.firebaseio.com/contacts.json",
      {
        method: "POST",
        body: JSON.stringify(contactData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    contactDispatch(addData(contactData));
  };
  return (
    <div>
      <h2>Add Contact</h2>
      <Card>
        <div className="add_form">
          <form onSubmit={submitHandler}>
            <div className="input">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Phone Number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </div>
            <div>
              <input type="submit" value="Add Contact" className="btn_submit" />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default AddContact;
