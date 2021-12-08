import Calendar from "../components/Calendar";
import Popup from "../components/Modal";
import bg from "../assets/img/bg2.jpg";

function Home() {

	console.log('Render: Home');

	return (
		<div className="home">
			<div className="home__content">
				<img src={bg} alt="" />
				<div className="home__column">
					<div className="home__text">
						<div className="home__title">
							Choose the day for the meeting
						</div>
						<div className="home__subtitle">
							<p>I encourage you to book your appointment online.</p>
							<p>This will save you time.</p>
						</div>
					</div>
					<div className="home__calendar">
						<Calendar />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;