import React from 'react';
import './App.css';
import Main from './components/Main';
import loadData from './api/loadData';

export default class App extends React.Component {
  state = {
    hasMore: false, // control infinte scroll feature and prevent more requests
    images: [],
    searchTerm: '',
    skip: 0,
    limit: 9,
    serverError: {
      exist: false,
      message: ''
    }
  };

  /*******************************  utillity  funcs          ***********************************************
   *********************************************************************************************************/

  /*=========================================================================================================
  ====================      resetStateAndSetError_util func       =============================*/
  /**
   * \brief          used to reset the app state to its inital value and  set the error message with the input value
   * \param[in]      errMessage =>  string &  mandatory
   * \return         none
   */
  resetStateAndSetError_util = errMessage => {
    // 1- Validating function input

    // 2-  function logic
    this.setState({
      hasMore: false,
      images: [],
      searchTerm: '',
      skip: 0,
      limit: 9,
      serverError: {
        exist: true,
        message: errMessage
      }
    });
  };

  /*=========================================================================================================
  ====================      resetDefaultStateAndKeepSearchTerm_util func       =============================*/
  /**
   * \brief          used to reset the app state to its inital value and  keeping the search term
   * \param[in]      none
   * \return         none
   */
  resetDefaultStateAndKeepSearchTerm_util = () => {
    this.setState({
      hasMore: false,
      images: [],
      skip: 0,
      limit: 9,
      serverError: {
        exist: false,
        message: ''
      }
    });
  };

  /*========================================================================================================
  =======================             customizeRequest_util func               ============================*/
  /**
   * \brief          customize and send request to the server with  optional skip value.
   * \param[in]      subURL =>  string &  mandatory , skip =>  Number &  optional
   * \return         Promise
   */

  customizeRequest_util = (subURL, skip = this.state.skip) => {
    // 1- Validating function input

    // 2- return function output
    return loadData.get(subURL, {
      params: {
        term: this.state.searchTerm,
        skip,
        limit: this.state.limit
      }
    });
  };

  /*******************************  Lifecycle hooks           ***********************************************
   *********************************************************************************************************/

  /*========================================================================================================
=======================                componentDidMount func               ===============================*/
  /**
   * \brief          handle request for the first time to get initial data and update the state with the obtained data
   * \param[in]      none
   * \return         none
   */
  componentDidMount() {
    this.customizeRequest_util('/home')
      .then(response => {
        if (!response.data.error) {
          this.setState({
            hasMore: response.data.hasMore,
            images: this.state.images.concat(response.data.data),
            skip: parseInt(response.data.data.length)
          });
        }
      })
      .catch(error => {
        this.resetStateAndSetError_util('Unable to connect To server');
      });
  }

  /*******************************  callback   funcs          ***********************************************
   *********************************************************************************************************/

  /*=========================================================================================================
=================================             onSubmit func               =================================*/
  /**
   * \brief          onSubmit is callback function called When Submitting form
   *                 TO  handle request (update the searchTerm , update skip and limit , remove serverError)
   *                 update the state with the obtained data
   * \param[in]      eventObject
   * \return         none
   */
  onSubmit = async e => {
    e.preventDefault();
    try {
      await this.resetDefaultStateAndKeepSearchTerm_util();
      const response = await this.customizeRequest_util('/home');

      if (!response.data.error) {
        this.setState({
          hasMore: response.data.hasMore,
          images: response.data.data,
          skip: parseInt(response.data.hasMore.length),
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

  /*========================================================================================================
    ================================             onChange func               ==============================*/
  /**
   * \brief          onChange is callback function  used BY input to update the searchTerm state
   * \param[in]      eventObject
   * \return         none
   */

  onChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  /*========================================================================================================
    =======================             loadMore func               =======================================*/
  /**
   * \brief          loadMore is callback function  used BY for infinte scroll feature
   *                 TO  handle request (Keeping the searchTerm , update skip and limit )
   *                 update the state with the obtained data
   * \param[in]      none
   * \return         none
   */
  loadMore = async () => {
    try {
      const response = await this.customizeRequest_util(
        '/home',
        this.state.skip + this.state.limit
      );

      if (!response.data.error) {
        this.setState({
          skip: parseInt(this.state.skip) + parseInt(response.data.data.length),
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

  /*******************************     render  funcs        ************************************************
   *********************************************************************************************************/

  /*========================================================================================================
  ===================================             render func               ===============================*/
  /**
   * \brief          render all app components and propgate the state and callbacks to children
   * \param[in]      none
   * \return         none
   */
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
