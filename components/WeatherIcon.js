
export default function WeatherIcon({ iconDescription }) {

    if (iconDescription === 'cool') {
        return (
            <div icon="supermoon" data-label="">
                <span className="moon"></span>
                <span className="meteor"></span>
            </div>
        )
    }
    if (iconDescription === 'clear') {
        return (
            <div icon="sunny" data-label="">
                <span className="sun"></span>
            </div>
        )
    }
    if (iconDescription === 'clouds') {
        return (
            <div icon="cloudy" data-label="">
                <span className="cloud"></span>
                <span className="cloud"></span>
            </div>
        )
    }
    if (iconDescription === 'snow') {
        return (
            <div icon="snowy" data-label="">
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
        )
    }
    if (iconDescription === 'rain') {
        return (
            <div icon="stormy" data-label="">
                <span className="cloud"></span>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        )
    }

    return null

}

//     return (
//         <div>
//             <div icon="sunny" data-label="Sunny">
//                 <span className="sun"></span>
//             </div>

//             <div icon="cloudy" data-label="Perfect">
//                 <span className="cloud"></span>
//                 <span className="cloud"></span>
//             </div>

//             <div icon="snowy" data-label="Chilly">
//                 <span className="snowman"></span>
//                 <ul>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                 </ul>
//             </div>

//             <div icon="stormy" data-label="Soggy">
//                 <span className="cloud"></span>
//                 <ul>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                 </ul>
//             </div>

//             <div icon="supermoon" data-label="Cool!">
//                 <span className="moon"></span>
//                 <span className="meteor"></span>
//             </div>
//         </div>
//     )
// }
