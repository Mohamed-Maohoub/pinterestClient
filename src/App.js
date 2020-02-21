import React from 'react';

import './App.css';
import Main from './components/Main';

import loadData from './api/loadData';

export default class App extends React.Component {
  state = {
    hasMore: false,
    images: [],
    searchTerm: '',
    skip: 0,
    limit: 12
  };

  componentDidMount() {
    console.log('componentDidMount func');
    loadData
      .get('/home', {
        params: {
          term: this.state.searchTerm,
          skip: this.state.skip,
          limit: this.state.limit
        }
      })
      .then(response => {
        if (!response.error) {
          console.log('res.data', response.data.data);
          console.log('resHas', response.data.hasMore);
          this.setState({
            hasMore: response.data.hasMore,
            images: this.state.images.concat(response.data.data)
          });
        }
      })
      .catch(error => {
        console.log('request failed');
      });
  }

  onSubmit = async e => {
    e.preventDefault();

    try {
      const response = await loadData.get('/home', {
        params: {
          term: this.state.searchTerm,
          skip: this.state.skip,
          limit: this.state.limit
        }
      });
      if (!response.error) {
        this.setState({
          hasMore: response.data.hasMore,
          images: response.data.data
        });
      }
    } catch (error) {
      console.log('request failed');
    }
  };

  onChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  loadMore = async () => {
    console.log('loadmore func');
    try {
      const response = await loadData.get('/home', {
        params: {
          term: this.state.searchTerm,
          skip: this.state.skip + this.state.limit,
          limit: this.state.limit
        }
      });
      console.log(response.data.data);
      console.log(response.data.hasMore);
      if (!response.data.hasOwnProperty('error')) {
        this.setState({
          skip: this.state.skip + this.state.limit,
          hasMore: response.data.hasMore,
          images: this.state.images.concat(response.data.data)
        });
      } else {
        if (this.state.hasMore) {
          this.setState({
            hasMore: false
          });
        }
      }
    } catch (error) {
      console.log('request failed');
    }
  };
  render() {
    return (
      <div className="App">
        <Main
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          loadMore={this.loadMore}
          searchTerm={this.state.searchTerm}
          images={this.state.images}
          hasMore={this.state.hasMore}
        ></Main>
      </div>
    );
  }
}

// import React, { useState } from 'react';

// import './App.css';
// import Main from './components/Main';

// import loadData from './api/loadData';
// function App() {
//   let [appState, setAppState] = useState({
//     hasMore: false,
//     images: [],
//     searchTerm: '',
//     skip: 0,
//     limit: 12
//   });

//   const onSubmit = async e => {
//     e.preventDefault();

//     try {
//       const response = await loadData.get('/home', {
//         params: {
//           term: appState.searchTerm,
//           skip: appState.skip,
//           limit: appState.limit
//         }
//       });
//       if (!response.error) {
//         setAppState({
//           ...appState,
//           hasMore: response.data.hasMore,
//           images: response.data.data
//         });
//       }
//     } catch (error) {
//       console.log('request failed');
//     }
//   };

//   const onChange = e => {
//     setAppState({ ...appState, searchTerm: e.target.value });
//   };
//   const loadMore = async () => {
//     try {
//       const response = await loadData.get('/home', {
//         params: {
//           term: appState.searchTerm,
//           skip: appState.skip + appState.limit,
//           limit: appState.limit
//         }
//       });
//       console.log(response);
//       if (!response.error) {
//         setAppState({
//           searchTerm: appState.searchTerm,
//           skip: appState.skip + appState.limit,
//           limit: appState.limit,
//           hasMore: response.data.hasMore,
//           images: appState.images.concat(response.data.data)
//         });
//       }
//     } catch (error) {
//       console.log('request failed');
//     }
//   };
//   return (
//     <div className="App">
//       <Main
//         onSubmit={onSubmit}
//         onChange={onChange}
//         loadMore={loadMore}
//         searchTerm={appState.searchTerm}
//         images={appState.images}
//         hasMore={appState.hasMore}
//       ></Main>
//     </div>
//   );
// }

// export default App;
