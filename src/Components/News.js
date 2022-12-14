import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(
      this.props.category,
    )} - NewsMonkey`
  }

  static defaultProps = {
    country: 'in',
    pageSize: '18',
    category: 'science',
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  defaultImage =
    'https://image.cnbcfm.com/api/v1/image/107112704-Bowlus_Volterra_Electric_RV.jpg?v=1662048652&w=1920&h=1080'

  async updateNews() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=${this.props.apiKey}
      &page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({
      loading: true,
    })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
    })
    this.props.setProgress(100)
  }

  // handleNext = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   })
  //   this.updateNews()
  // }

  // handlePrevious = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   })

  //   this.updateNews()
  // }

  fetchMoreData = async () => {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&category=${this.props.category}&apiKey=${
      this.props.apiKey
    }
      &page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    this.setState({
      loading: true,
    })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: this.state.page + 1,
      loading: false,
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews()
  }
  render() {
    return (
      <>
        <h1 className="text-center mt-3">NewsMonkey - Top Headlines</h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row mt-3">
              {this.state.articles.map((element) => {
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
                      source={element.source.name}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between mb-3">
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
        </div> */}
      </>
    )
  }
}

export default News
