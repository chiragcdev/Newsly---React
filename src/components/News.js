import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
    

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = ''+ props.category.charAt(0).toUpperCase() + props.category.slice(1) +' - Newsly';
        updateNews();
        /* eslint-disable-next-line */
    }, [])

   

    // const handlePrevClick = async () => {
    //     setPage(page - 1);
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1);
    //     updateNews();
    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };


 
    return (
        <>
            <h1 className="text-center" style={{margin: '90px 0 30px'}}>Newsly - Top {''+ props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1>
            {loading && <Spinner />}

            <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                    >  
            <div className='container pb-4'>
                <div className='row'>                           
                    {/* {!loading && articles.map((element) => { */}
                    {articles.map((element) => {
                        return<div className="col-md-4 col-xs-12" key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0, 45): ""} date={element.publishedAt} description={element.description?element.description.slice(0, 96): ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} source={element.source.name} />
                        </div>
                    })}                 
                </div>
            </div>
            </InfiniteScroll>

            {/* <div className='row'>
                <div className='container d-flex justify-content-between mt-4'>
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page >= Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>    
            </div>            */}
        </>
    )
  
}

News.defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
