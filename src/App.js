import './App.css'

import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import LoadingBar from 'react-top-loading-bar'
import News from './Components/News'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export default class App extends Component {
  pageSize = 15
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 10,
  }

  setProgress = (progress) => {
    this.setState({
      progress: progress,
    })
  }
  render() {
    return (
      // Used key to remount the component did mount in the component
      <>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress} />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  key="general"
                  country="in"
                  apiKey={this.apiKey}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  key="business"
                  country="in"
                  apiKey={this.apiKey}
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  key="entertainment"
                  country="in"
                  apiKey={this.apiKey}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/general"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  key="general"
                  country="in"
                  apiKey={this.apiKey}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  key="health"
                  country="in"
                  apiKey={this.apiKey}
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  key="science"
                  country="in"
                  apiKey={this.apiKey}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  key="sports"
                  country="in"
                  apiKey={this.apiKey}
                  category="sports"
                />
              }
            />

            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="in"
                  apiKey={this.apiKey}
                  key="technology"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </>
    )
  }
}
