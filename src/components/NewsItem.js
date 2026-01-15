import React from 'react'

const NewsItem = (props) => {
    let {title, date, description, imgUrl, newsUrl, author, source} = props
    return (
        <div className="card my-2">
            <div className="position-relative">
                <span className="position-absolute bottom-0 end-0 badge rounded-pill bg-danger">
                    {source}
                </span>
                <img src={!imgUrl?"https://placehold.co/600x400": imgUrl} className="card-img-top" alt="..." style={{height: "200px", objectFit: 'cover'}} />
            </div>
            <div className="card-body">
                <small className="text-body-secondary">By {!author? "Unknown": author} on {new Date(date).toLocaleDateString()}</small>
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
    )
}

export default NewsItem
