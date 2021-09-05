import axios from 'axios'
import { useEffect, useState } from 'react'

export default function NewsFeedTicker() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState()


    useEffect(() => {
        const getLatestNews = async () => {
            const { data } = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&country=us`, {
                // header: {
                //     'Content-Type': 'text/event-stream',
                //     'Cache-Control': 'no-cache',
                //     'Connection': 'keep-alive',
                //     'X-Accel-Buffering': 'no',
                //     'Acces-Control-Allow-Origin': "*"
                // }

            })
            setNews(data.results)
            console.log(data.results)
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
                    <li className='text-left' key={index}><a href={info.link} target="_blank">{info.title}</a></li>
                ))}
            </ul>
        </div>

    )
}
