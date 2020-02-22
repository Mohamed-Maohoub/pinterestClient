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
    limit: 12,
    serverError: {
      exist: false,
      message: ''
    }
  };

  /*************************** utillity funcs ***********************************************/

  /* ================================ customizeRequest_util func =============================*/
  /* 
  input arguments 



*/
  customizeRequest_util = (subURL, skip = this.state.skip) => {
    return loadData.get(subURL, {
      params: {
        term: this.state.searchTerm,
        skip,
        limit: this.state.limit
      }
    });
  };

  resetStateAndSetError_util = errMessage => {
    this.setState({
      hasMore: false,
      images: [],
      searchTerm: '',
      skip: 0,
      limit: 12,
      serverError: {
        exist: true,
        message: errMessage
      }
    });
  };

  resetDefaultStateAndKeepSearchTerm_util = () => {
    console.log('resetDefaultStateAndKeepSearchTerm_util');
    this.setState({
      hasMore: false,
      images: [],
      skip: 0,
      limit: 12,
      serverError: {
        exist: false,
        message: ''
      }
    });
    console.log(this.state);
  };

  /*************************** life Cycle hook  funcs ***********************************************/

  /* ============================== componentDidMount func ===========================================*/

  componentDidMount() {
    this.customizeRequest_util('/home')
      .then(response => {
        if (!response.error) {
          this.setState({
            hasMore: response.data.hasMore,
            images: this.state.images.concat(response.data.data)
          });
        }
      })
      .catch(error => {
        this.resetStateAndSetError_util('Unable to connect To server');
      });
  }

  /*************************** callback  funcs ***********************************************/
  /* ==================== onSubmit func =============================*/

  onSubmit = async e => {
    e.preventDefault();
    try {
      await this.resetDefaultStateAndKeepSearchTerm_util();
      const response = await this.customizeRequest_util('/home');
      if (!response.data.error) {
        this.setState({
          hasMore: response.data.hasMore,
          images: response.data.data,
          serverError: {
            exist: false,
            message: ''
          }
        });
      } else {
        this.resetStateAndSetError_util(response.data.error);
      }
    } catch (error) {
      this.resetStateAndSetError_util('Unable to connect To server');
    }
  };

  /* ==================== onSubmit func =============================*/

  onChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  /* ==================== onSubmit func =============================*/

  loadMore = async () => {
    const baseURLValue = this.state.searchTerm ? '/home' : '/home';
    try {
      const response = await this.customizeRequest_util(
        baseURLValue,
        this.state.skip + this.state.limit
      );

      if (!response.data.hasOwnProperty('error')) {
        this.setState({
          skip: this.state.skip + this.state.limit,
          hasMore: response.data.hasMore,
          images: this.state.images.concat(response.data.data)
        });
      } else {
        /*
          handling the case when data was sent matching the limit but there is no
           incomming data so hasMore Will not Sent and it has to be set to prevent more requests
            */
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
          serverError={this.state.serverError}
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
