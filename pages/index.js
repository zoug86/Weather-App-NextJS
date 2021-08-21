import Head from 'next/head'
import WeatherDisplay from '../components/WeatherDisplay'

export default function Home({ title, keywords, description }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon.ico' />
      </Head >
      <WeatherDisplay />

    </div >
  )
}
Home.defaultProps = {
  title: 'Weather Forecast',
  keywords: 'weather, forecast, temperature',
  description: 'The best weather forcast application'
}