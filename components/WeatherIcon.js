
export default function WeatherIcon({ iconDescription }) {

    if (iconDescription === 'cool') {
        return (
            <div icon="supermoon" data-label="Cool!">
                <span className="moon"></span>
                <span className="meteor"></span>
            </div>
        )
    }
    return (
        <div>
            <div icon="sunny" data-label="Sunny">
                <span className="sun"></span>
            </div>

            <div icon="cloudy" data-label="Perfect">
                <span className="cloud"></span>
                <span className="cloud"></span>
            </div>

            <div icon="snowy" data-label="Chilly">
                <span className="snowman"></span>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div icon="stormy" data-label="Soggy">
                <span className="cloud"></span>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div icon="supermoon" data-label="Cool!">
                <span className="moon"></span>
                <span className="meteor"></span>
            </div>
        </div>
    )
}
