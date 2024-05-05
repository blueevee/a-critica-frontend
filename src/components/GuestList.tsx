import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/GuestList.css"


interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const GuestList: React.FC = () => {
  const [guest, setGuest] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/guest')
      .then((response) => {
        setGuest(response.data.map((guest: Guest) => ({
          name: guest.name,
        })))
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ul className="guest-list">
        {guest.map((guest: Guest) => (
          <li key={guest.name}>{guest.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;