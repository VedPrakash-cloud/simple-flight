import { useState } from "react";
import FlightCard from "./card";

function App() {
  const [data, setData] = useState("");
  const [flights, setFlights] = useState([]);

  const handleInput = () => {
    const rows = data
      .split("\n")
      .map((r) => r.trim())
      .filter((l) => l !== "");
    let itinerary = [];
    let currentLeg = null;

    rows.forEach((line, idx) => {
      if (line.match(/(Flight\s\d+|Departing\sflight|Returning\sflight)/i)) {
        if (currentLeg) itinerary.push(currentLeg);
        currentLeg = {
          header: line,
          date: rows[idx + 1],
          segments: [],
          totalEmmissions: "",
        };
      } else if (/\d{1,2}:\d{2}\s?[AP]M/i.test(line)) {
        const lastItem = currentLeg?.segments[currentLeg.segments.length - 1];

        if (!lastItem || lastItem.type === "LAYOVER" || lastItem.arrival) {
          currentLeg.segments.push({
            type: "FLIGHT",
            departure: line,
            duration: rows[idx + 1],
            arrival: "",
            airline: "",
            class: "",
          });
        } else {
          lastItem.arrival = line;
        }
      } else if (/(Economy|Business|First|Premium)/i.test(line)) {
        const currentFlight = currentLeg?.segments.find(
          (s) => s.type === "FLIGHT" && !s.class,
        );
        if (currentFlight) {
          currentFlight.airline = rows[idx - 1];
          currentFlight.class = line;
          currentFlight.flightNo = rows[idx + 1];
        }
      } else if (line.toLowerCase().includes("layover")) {
        currentLeg?.segments.push({ type: "LAYOVER", content: line });
      }
    });

    if (currentLeg) itinerary.push(currentLeg);

    setFlights(itinerary);
    setData("");
  }; 

  return (
    <div className="p-2 md:p-10 min-h-dvh">
      <div>
        <textarea
          type="text"
          value={data}
          placeholder="Paste flight from google flights..."
          className="rounded-lg w-full h-48 outline-0 shadow-sm shadow-gray-500/30 inset-shadow-2xs inset-shadow-gray-500/30 p-5"
          onChange={(e) => setData(e.target.value)}
        />
        <input
          type="submit"
          value="Submit"
          className="rounded-lg px-4 mt-2 md:mt-5 py-1 font-semibold cursor-pointer active:scale-95 inset-shadow-sm inset-shadow-gray-500/30 shadow-sm shadow-gray-500/30"
          onClick={handleInput}
        />
      </div>
      <div className="my-5">
        <FlightCard itinerary={flights} />
      </div>
    </div>
  );
}

export default App;
