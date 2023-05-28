import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

import TextContainer from "../Text Container/TextContainer";
import Messages from "../messages/Messages";
import InfoBar from "../Infobar/Infobar";
import Input from "../Input/Input";

import "./Chat.css";

const ENDPOINT = "localhost:5000";

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null); // Initialize socket with null

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nameFromParams = params.get("name");
    const roomFromParams = params.get("room");

    setName(nameFromParams);
    setRoom(roomFromParams);

    const newSocket = io(ENDPOINT);
    setSocket(newSocket); // Update socket with the new connection

    newSocket.emit("join", { name: nameFromParams, room: roomFromParams }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      newSocket.disconnect(); // Clean up socket connection on component unmount
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });

      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }
  }, [socket]);

  const sendMessage = (event) => {
    console.log("dksd",message,socket);
    event.preventDefault();

    if (socket && message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
