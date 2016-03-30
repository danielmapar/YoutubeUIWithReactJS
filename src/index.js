// React -> manage components
// ReactDOM -> render component
import React, {Component} from 'react'; // 'react' is literally the node_module name
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';


import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCW7z1fNzrflbeGzsacYcsXcomy2fWcvZg';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { videos: [],
                   selectedVideo: null };

    this.videoSearch('surfboard')
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({videos: videos,
                     selectedVideo: videos[0]});
      // Some ES6 syntactic sugar = key and property
      // have the same name ---> this.setState({videos})
    });
  }

  render() {

    // Make a new function that can only be called once every 300 miliseconds
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} /> {/* passing props */}
      </div>
    );
  }
}

// Create a new component. This component should produce
// some HTML
// This is a factory that produceses instances (functional component, no state)
// const App = () => { // now we have fat arrows, the only difference of
  // function() {} to this new method, is the parameter "this"

  // JS that produces HTML
  //return (
  //  <div>
  //    <SearchBar />
  //  </div>
  //); // This look alike HTML inside JS is JSX (webpack and babel comes to play)

  // This gets transpiled to vanilla JS (ES5)
  // App = function App() {
  //  return React.createElement("div", null, "Hi!"); --> it creates the instance
  // }
//}

// Take this component's generated HTML and put it
// on the page (in the DOM)
// React.createElement(_temporalAssertDefined(App, ""....)
// We are making an instance of an App (self closing tag) and selecting a target
// DOM node (container - check index.html)
ReactDOM.render(<App />, document.querySelector('.container'));
