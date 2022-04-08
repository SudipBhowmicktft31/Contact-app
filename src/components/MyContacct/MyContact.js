import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteData, fetchData } from "../../Redux/Action";
import Card from "../UI/Card";
import "./MyContact.css";
const MyContact = () => {
  const contacts = useSelector((state) => state.Reducer.contacts);
  // console.log(contacts);
  const dispatch = useDispatch();
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
    console.log(loadedContact);
    // console.log(contacts)
    dispatch(fetchData(loadedContact));
  };
  useEffect(() => {
    fetchContact();
  }, []);
  const contactDeleteHandler = (id, key) => {
    dispatch(deleteData(id));
    fetch(
      `https://contact-app-5418e-default-rtdb.firebaseio.com/contacts/${key}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (response.ok) {
        //dispatch loading spinner
        console.log(response);
      }
    });
    toast.success("Contact Deleted Successfully!!");
  };
  return (
    <div>
      <div className="action">
        <Link to="/add" className="link_btn">
          Add Contact
        </Link>
      </div>
      {contacts.length !== 0 ? (
        <Card>
          <h2>Welcome to My Contact</h2>
          <table className="center">
            <thead>
              <tr>
                <th>Sl_No.</th>
                <th>Name</th>
                <th>Email Id</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {console.log(contacts)}
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.number}</td>
                  <td>
                    <Link
                      className="edit"
                      to={`/edit/${contact.id}`}
                      state={{ key: contact.key }}
                    >
                      Edit
                    </Link>
                    {console.log(contact.id)}
                    <button
                      className="delete"
                      onClick={() =>
                        contactDeleteHandler(contact.id, contact.key)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <h2>No Contact Found</h2>
      )}
    </div>
  );
};
export default MyContact;
