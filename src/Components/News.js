import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

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
  static defaultProps = {
    country: 'in',
    pageSize: '18',
    category: 'science',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  defaultImage =
    'https://image.cnbcfm.com/api/v1/image/107112704-Bowlus_Volterra_Electric_RV.jpg?v=1662048652&w=1920&h=1080'

  handleNext = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    )
      return
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&category=${
      this.props.category
    }&apiKey=1d06f9e829744b7ba93a3c686a66554d
    &page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    this.setState({
      loading: true,
    })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false,
    })
  }

  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&category=${
      this.props.category
    }&apiKey=1d06f9e829744b7ba93a3c686a66554d
    &page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({
      loading: true,
    })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    })
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=1d06f9e829744b7ba93a3c686a66554d
    &page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({
      loading: true,
    })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }
  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center">NewsMonkey - Top Headlines</h1>
          {this.state.loading && <Spinner />}
          <div className="row mt-3">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={
                        element.urlToImage === null
                          ? this.defaultImage
                          : element.urlToImage
                      }
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
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
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
