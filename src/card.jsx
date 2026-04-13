export default function FlightCard({ itinerary }) {    
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center">Flight Details</h1>
      {itinerary.map((item, idx) => (
        <div key={idx} className="my-6 border border-gray-400/20 rounded-lg px-2 py-5">
          <h1 className="font-semibold text-xl md:text-2xl mb-5">
            {item.header}.{item.date}
          </h1>
          <div className="md:px-5">
            {item.segments.map((flight, Flightidx) => (
              <div key={Flightidx}>
                {flight.type === "FLIGHT" ? (
                  <div className="rounded-lg p-2 md:p-5 inset-shadow-sm inset-shadow-mauve-500/30 shadow-sm shadow-pink-500/30">
                    <p className="font-semibold py-2 text-base md:text-xl">
                      {flight.departure.replace(/([AP]M(?:\+\d+)?)([A-Z\s])/i, "$1 $2")}
                    </p>
                    <span className="text-sm md:text-base font-semibold px-2 text-gray-500/50">{flight.duration}</span>
                    <p className="font-semibold pt-2 text-base md:text-xl text-wrap">{flight.arrival.replace(/([AP]M(?:\+\d+)?)([A-Z\s])/i,"$1 $2")}</p>
                    <p className="text-xs md:text-sm font-semibold p-2 text-gray-500/50">{flight.airline}.{flight.class}.{flight.flightNo.replace(/(\w+)([A-Z0-9][A-Z]\s\d+)/i,"$1.$2")}</p>
                  </div>
                ) : (
                <p className="text-gray-500/50 px-5 my-5 font-semibold">{flight.content.replace(/(layover)([A-Z])/i,"$1 $2")}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
