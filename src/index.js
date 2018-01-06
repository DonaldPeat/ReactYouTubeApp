import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//replace with a unique API_KEY from https://console.developers.google.com/apis/
const API_KEY = 'AIzaSyC6qS5jccFB6h8t1uDskZcEFXOXj0tWnU4';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    //search term for inital video list
    this.videoSearch('net neutrality');
  }

  videoSearch(searchTerm){
    YTSearch({key: API_KEY, term: searchTerm}, (videos) => {
      this.setState({
        videos:videos,
        selectedVideo:videos[0]
      });
    })
  }

  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos = {this.state.videos}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));
