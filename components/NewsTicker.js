import axios from 'axios'
import { useEffect, useState } from 'react'

export default function NewsFeedTicker() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState()


    useEffect(() => {
        const getLatestNews = async () => {
            const { data } = await axios.get(`http://api.mediastack.com/v1/news?access_key=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&countries=au,-us`)
            setNews(data.data)
            console.log(data.data)
            setLoading(false)
        }
        getLatestNews()
    }, [loading])
    //console.log(news)
    return (

        <div className="news blue mb-3">
            <span onClick={() => setLoading(true)}> Latest News</span>
            <ul>
                {news.map((info, index) => (
                    <li className='text-left' key={index}><a href="#">{info.title}</a></li>
                ))}
            </ul>
        </div>

    )
}
