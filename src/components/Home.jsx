import Calendar from "./Calendar";
import Popup from "./Popup";

function Home() {
	return (
		<div className="home">
			<div className="home__content">
				<img src="/img/bg.png" alt="" />
				<div className="home__column">
					<div className="home__text">
						<div className="home__title">
							Choose the day for the meeting
						</div>
						<div className="home__subtitle">
							<p>We encourage you to book your appointment online.</p>
							<p>This will save you time.</p>
						</div>
					</div>
					<div className="home__calendar">
						<Calendar />
					</div>
				</div>
				<Popup />
			</div>
		</div>
	);
}

export default Home;