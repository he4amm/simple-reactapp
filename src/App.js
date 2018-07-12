import React, { Component } from 'react';
import Navbar from './components/Navbar';
import StoryCard from './components/StoryCard';
import './App.css';
import data from './stories.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>

        <div className="App-content">
          <span className="App-content__head">Watchlist</span>

          <div className="App-content__stories">
            {data.stories.map((story, index) => 
              <StoryCard
                key={index}
                story={story}
              ></StoryCard>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
