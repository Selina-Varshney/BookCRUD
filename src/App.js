// import React, { Component } from "react";
// import logo from "./logo.svg";
// import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       books: [],
//     };
//   }

//   componentDidMount() {
//     axios.get("/api/book").then((res) => {
//       this.setState({ books: res.data });
//       console.log(this.state.books);
//     });
//   }

//   render() {
//     return (
//       <div class="container mt-5 mb-5">
//         <div class="panel panel-default">
//           <div class="d-flex justify-content-center mb-2">
//             <h1>BOOK CATALOG</h1>
//           </div>
//           <div class="card">
//             <div class="card-body">
//               <div class="panel-body">
//                 <h4>
//                   <Link to="/create" class="btn btn-outline-warning">
//                     <span
//                       class="glyphicon glyphicon-th-list"
//                       aria-hidden="true"
//                     ></span>{" "}
//                     Add Book
//                   </Link>
//                 </h4>
//                 <table class="table table-stripe">
//                   <thead>
//                     <tr>
//                       <th>ISBN</th>
//                       <th>Title</th>
//                       <th>Author</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {this.state.books.map((book) => (
//                       <tr>
//                         <td>
//                           <Link to={`/show/${book._id}`}>{book.isbn}</Link>
//                         </td>
//                         <td>{book.title}</td>
//                         <td>{book.author}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;

// import React, { Component } from "react";
// import logo from "./logo.svg";
// import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       books: [],
//     };
//   }

//   componentDidMount() {
//     axios.get("/api/book").then((res) => {
//       this.setState({ books: res.data });
//       console.log(this.state.books);
//     });
//   }

//   updateBook = (id) => {
//     // Replace updatedBookData with the object containing the updated book data
//     const updatedBookData = {
//       // Add the updated fields here (e.g., title, author, description, etc.)
//     };

//     axios
//       .put(`/api/book/${id}`, updatedBookData)
//       .then((res) => {
//         // Update the state or refresh the book list
//         // This step depends on how you manage the state in your application
//       })
//       .catch((err) => {
//         console.error(err);
//         // Handle any error that occurs during the update process
//       });
//   };

//   deleteBook = (id) => {
//     axios
//       .delete(`/api/book/${id}`)
//       .then((res) => {
//         // Remove the deleted book from the state or refresh the book list
//         // This step depends on how you manage the state in your application
//       })
//       .catch((err) => {
//         console.error(err);
//         // Handle any error that occurs during the delete process
//       });
//   };

//   render() {
//     return (
//       <div className="container mt-5 mb-5">
//         <div className="panel panel-default">
//           <div className="d-flex justify-content-center mb-2">
//             <h1>BOOKs CATALOG</h1>
//           </div>
//           <div className="card">
//             <div className="card-body">
//               <div className="panel-body">
//                 <h4>
//                   <Link to="/create" className="btn btn-outline-warning">
//                     <span
//                       className="glyphicon glyphicon-th-list"
//                       aria-hidden="true"
//                     ></span>{" "}
//                     Add Book
//                   </Link>
//                 </h4>
//                 <table className="table table-stripe">
//                   <thead>
//                     <tr>
//                       <th>ISBN</th>
//                       <th>Title</th>
//                       <th>Author</th>
//                       <th>Update</th>
//                       <th>Delete</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {this.state.books.map((book) => (
//                       <tr key={book._id}>
//                         <td>
//                           <Link to={`/show/${book._id}`}>{book.isbn}</Link>
//                         </td>
//                         <td>{book.title}</td>
//                         <td>{book.author}</td>
//                         <td>
//                           <button
//                             className="btn btn-outline-info"
//                             onClick={() => this.updateBook(book._id)}
//                           >
//                             Update
//                           </button>
//                         </td>
//                         <td>
//                           <button
//                             className="btn btn-outline-danger"
//                             onClick={() => this.deleteBook(book._id)}
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      updatingBook: null,
      updatedBookData: {
        title: "",
        author: "",
        description: "",
        // Add other fields as needed
      },
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    axios
      .get("/api/book")
      .then((res) => {
        this.setState({ books: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  updateBook = (id) => {
    const bookToUpdate = this.state.books.find((book) => book._id === id);
    this.setState({
      updatingBook: bookToUpdate,
      updatedBookData: {
        title: bookToUpdate.title,
        author: bookToUpdate.author,
        description: bookToUpdate.description,
        // Add other fields as needed
      },
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      updatedBookData: {
        ...prevState.updatedBookData,
        [name]: value,
      },
    }));
  };

  handleSubmitUpdate = () => {
    const { updatingBook, updatedBookData } = this.state;
    axios
      .put(`/api/book/${updatingBook._id}`, updatedBookData)
      .then((res) => {
        this.setState({
          updatingBook: null,
          updatedBookData: {
            title: "",
            author: "",
            description: "",
            // Reset other fields as needed
          },
        });
        this.fetchBooks(); // Fetch updated book list
      })
      .catch((err) => {
        console.error(err);
      });
  };

  deleteBook = (id) => {
    // Show a confirmation dialog to ask the user if they want to delete the book
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      axios
        .delete(`/api/book/${id}`)
        .then((res) => {
          this.fetchBooks(); // Fetch updated book list
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  render() {
    const { books, updatingBook, updatedBookData } = this.state;

    return (
      <div className="container mt-5 mb-5">
        <div className="panel panel-default">
          <div className="d-flex justify-content-center mb-2">
            <h1>BOOK CATALOG</h1>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="panel-body">
                <h4>
                  <Link to="/create" className="btn btn-outline-warning">
                    <span
                      className="glyphicon glyphicon-th-list"
                      aria-hidden="true"
                    ></span>{" "}
                    Add Book
                  </Link>
                </h4>
                <table className="table table-stripe">
                  <thead>
                    <tr>
                      <th>ISBN</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book._id}>
                        <td>
                          <Link to={`/show/${book._id}`}>{book.isbn}</Link>
                        </td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                          {updatingBook && updatingBook._id === book._id ? (
                            <div>
                              <input
                                type="text"
                                name="title"
                                value={updatedBookData.title}
                                onChange={this.handleInputChange}
                              />
                              <input
                                type="text"
                                name="author"
                                value={updatedBookData.author}
                                onChange={this.handleInputChange}
                              />
                              <textarea
                                name="description"
                                value={updatedBookData.description}
                                onChange={this.handleInputChange}
                              />
                              {/* Add other input fields as needed */}
                              <button onClick={this.handleSubmitUpdate}>
                                Save
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => this.updateBook(book._id)}>
                              Update
                            </button>
                          )}
                        </td>
                        <td>
                          <button onClick={() => this.deleteBook(book._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
