import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../redux/actions/messageAction";
import { Autocomplete, Button, TextField } from "@mui/material";
import MessageList from "../MessageList";

interface MessageInputProps {
  onSubmit: (message: string, date: Date) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
const [show , setShow] =useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setMessage(inputValue);
    // Check if the last character is "@"
    setShowAutocomplete(inputValue.endsWith("@"));
    isNameAvailable(inputValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      onSubmit(message, new Date()); // Include the date value
      setMessage("");
      setShow(true)
      setShowAutocomplete(false); // Hide autocomplete after submitting
    }
  };

  const data = [{ name: "Ravi", color: "red" }, { name: "kavi", color: "blue" }, { name: "john", color: "green" }];

  const handleAutocompleteChange = (_event: React.SyntheticEvent, value: any) => {
    if (value && value.name) {
      const newMessage = `${message}${value.name} `;
      setMessage(newMessage);
      setShowAutocomplete(false); // Hide autocomplete after selecting a value
    }
  };

  function isNameAvailable(messagedata: string) {
    let filteredMessage = messagedata;

    const matches = messagedata.match(/@(\w+)/g); // Using 'g' flag to find all matches

    if (matches !== null) {
      matches.forEach((match) => {
        const isNameAvailable = data.some((item) => item.name === match.substring(1));
        if (!isNameAvailable) {
          filteredMessage = filteredMessage.replace(match, "");
        }
      });
    }
    if (filteredMessage !== message) {
      setMessage(filteredMessage);
    }
  }
console.log(message)
  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="relative">
      <TextField
        type="text"
        value={message}
        autoComplete="off"
        onChange={handleChange}
        placeholder="Type your message..."
        inputProps={{
          style: {
            backgroundColor: '#fff',
            borderRadius: "5px",
            width: "500px",
            height: "150px",
            padding: '10px',
            fontSize:18
          }
        }}
      />
      <div className="flex justify-end my-2">
        <Button variant="contained" type="submit" sx={{ backgroundColor: "#CE86CF" }}>Send</Button>
      </div>
      {showAutocomplete && (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          getOptionLabel={(option) => option.name}
          options={data}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          sx={{
            width: "300px",
            background: "#fff",
            borderRadius: "5px",
            position: "absolute",
            right: "20px",
            bottom:"70px",
            fontSize:18
          }}
          onChange={handleAutocompleteChange}
          renderOption={(props, option) => (
            <li
              {...props}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                key={option.name}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: option.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 8,
                  color: "#ffffff",
                }}
              >
                {option.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ color: option.color }}>{option.name}</div>
            </li>
          )}
          renderInput={(params) => <TextField {...params} label="mention name" />}
        />
      )}
    </form>
    {show && <div style={{color:"#000",background:"#fff",padding:10}}>
          <h2 style={{fontSize:18}}>Messages:</h2>
          <MessageList />
        </div>}
      
    </Fragment>
    
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSubmit: (message: string, date: Date) => dispatch(sendMessage(message, date)), // Include date in onSubmit
  };
};

export default connect(null, mapDispatchToProps)(MessageInput);
