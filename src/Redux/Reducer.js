import { ADD_DATA, DELETE_DATA, EDIT_DATA, FETCH_DATA } from "./Type";

// const initialState = [
//   {
//     id: 0,
//     name: "Sudip Bhowmick",
//     number: "9123351353",
//     email: "sudip@gmail.com",
//   },
//   {
//     id: 1,
//     name: "Rusu Bhowmick",
//     number: "9051759270",
//     email: "rusu@gmail.com",
//   },
// ];
const initialState = {
  contacts: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        contacts: action.payload,
      };
    case ADD_DATA:
      return {
        contacts: [...state.contacts, action.payload],
      };
    case EDIT_DATA:
      console.log(action.payload);
      let allContact = [...state.contacts];
      allContact[action.payload.id] = action.payload;
      return {
        contacts: allContact,
        // showSpinner: state.showSpinner,
      };
    // const editedContact = state.contacts.map((contact) =>
    //   contact.id === action.payload.id ? action.payload : contact
    // );
    // return {
    //   contacts: editedContact,
    // };
    case DELETE_DATA:
      const filterContact = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      return {
        contacts: filterContact,
      };
    default:
      return state;
  }
};
export default contactReducer;
