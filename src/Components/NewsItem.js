import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {
      title,
      description,
      imageUrl,
      newsUrl,
      source,
      author,
      time,
    } = this.props

    return (
      <>
        <div className="card my-3">
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0',
            }}
          >
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text ">
              <small className="text-muted">
                Written by {author === null ? 'Unkown' : author} at{' '}
                {new Date(time).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              className="btn btn-small btn-primary"
              rel="noreferrer"
              target="_blank"
            >
              Read More
            </a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem
