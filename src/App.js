import React, { Component } from 'react';
import classes from './App.css';
import RestaurantList from './components/RestaurantList/RestaurantList';
import Toolbar from './components/Toolbar/Toolbar';

class App extends Component {
  state = {
    view: 'grid'
  }

  viewGrid = () => {
    this.setState({view: 'grid'});
  }

  viewList = () => {
    this.setState({view: 'list'});
  }


  render() {
    return (
      <div className={classes.App}> 
        <div className={classes.Toolbar}>
          <Toolbar view={this.state.view} listClicked={this.viewList} gridClicked={this.viewGrid} />
        </div>
        <div className={classes.ResList}>
          <RestaurantList view={this.state.view} />
        </div>
      </div>
    );
  }
}

export default App;
