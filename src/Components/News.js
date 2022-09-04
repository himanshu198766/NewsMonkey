import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
  }

  handleNext = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 18)) return
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1d06f9e829744b7ba93a3c686a66554d&page=${
      this.state.page + 1
    }&pageSize=18`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({ articles: parsedData.articles, page: this.state.page + 1 })
  }

  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1d06f9e829744b7ba93a3c686a66554d&page=${
      this.state.page - 1
    }&pageSize=18`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({ articles: parsedData.articles, page: this.state.page - 1 })
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1d06f9e829744b7ba93a3c686a66554d&page=${this.state.page}&pageSize=18`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    })
  }
  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center">NewsMonkey - Top Headlines</h1>

          <div className="row mt-3">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="container d-flex justify-content-between mb-3">
          <button
            type="button"
            className="btn btn-success"
            onClick={this.handlePrevious}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-success "
            onClick={this.handleNext}
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 18)
            }
          >
            Next &rarr;
          </button>
        </div>
      </>
    )
  }
}

export default News
