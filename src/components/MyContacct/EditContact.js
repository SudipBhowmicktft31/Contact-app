import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../UI/Card";
import "./EditContact.css";
import { fetchData } from "../../Redux/Action";
const EditContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const location = useLocation();

  const contactDispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const contacts = useSelector((state) => state.Reducer.contacts);

  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setNumber(currentContact.number);
    }
  }, [currentContact]);
  // console.log(currentContact);
  const submitHandler = (event) => {
    event.preventDefault();

    //validation
    const contactData = {
      key: location.state.key,
      id: parseInt(id),
      name: name,
      email: email,
      number: number,
    };
    fetch(
      `https://contact-app-5418e-default-rtdb.firebaseio.com/contacts/${location.state.key}.json`,
      {
        method: "PUT",
        body: JSON.stringify(contactData),
      }
    );
    contactDispatch({ type: "EDIT_DATA", payload: contactData });
    toast.success("Contact Edited Successfully");
    navigate("/");
    fetchContact();
  };
  const fetchContact = async () => {
    const response = await fetch(
      "https://contact-app-5418e-default-rtdb.firebaseio.com/contacts.json"
    );
    const responseData = await response.json();
    // console.log(responseData.data);
    const loadedContact = [];
    for (const key in responseData) {
      loadedContact.push({
        key: key,
        id: responseData[key].id,
        name: responseData[key].name,
        email: responseData[key].email,
        number: responseData[key].number,
      });
    }
    // console.log(loadedContact);
    // console.log(contacts)
    contactDispatch(fetchData(loadedContact));
  };
  // useEffect(() => {
  //   fetchContact();
  // },[]);
  return (
    <div>
      <h2>Edit Contact {id}</h2>
      {currentContact ? (
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
                <input
                  type="submit"
                  value="Add Contact"
                  className="btn_submit"
                />
                <Link to="/" className="cancel">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </Card>
      ) : (
        <h2>Contact with id:{id} not found</h2>
      )}
    </div>
  );
};
export default EditContact;
