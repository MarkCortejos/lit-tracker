import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import Header from './components/Header.js';
import Lists from './components/Lists.js';
import Active from './components/Active.js';
import Footer from './components/Footer.js';
import Search from './components/Search.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: null,
      searchModal: false,
    }
  }

  addBook = (listId, bookObject) => {
    const dbRef = firebase.database().ref(`lists/${listId}/books`);
    console.log(listId)
    dbRef.push(bookObject)
    console.log("book added", bookObject)
  }
  // this.addBook('-L_KQzxwU_v97JMIGhRg', {title: 'twilight2', author: 'Stephenie Meyer'} )
  
  deleteBook = (listId, bookId) => {
    //bookId is a unique identifier used to find the book in the database
    //when the bookObjects are being rendered in the activeList - pass the bookID to the button that listens for the event, the event listener will pass this method as a callback function
    const dbRef = firebase.database().ref(`lists/${listId}/books/${bookId}`);
    dbRef.remove();
  }
  // this.deleteBook('-L_KQzxwU_v97JMIGhRg', '-L_KTI_KL2G8dxuOSmRV') - this book is already deleted


  //This function will be called when a list in the Lists panel is clicked on, to set the state of the Active List to be that clicked list
  handleActiveList = (list) => {
    this.setState({
      activeList: list.listTitle
    })
    console.log(list);
  }

  handleSearchModalOn = () => {
    this.setState({
      searchModal: true
    })
  }
  
  handleSearchModalOff = () => {
    this.setState({
      searchModal: false
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="mainContent">
          <Active 
          passedState={this.state}
          handleSearchModalOn={this.handleSearchModalOn}
          />
          <Lists 
          handleActiveList={this.handleActiveList}
          />
        </div>
        {this.state.searchModal === true ? 
        <Search 
        handleSearchModalOff={this.handleSearchModalOff}
        /> : null}
        <Footer />
      </div>
    );
  }
}

export default App;