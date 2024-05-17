import { Avatar, Divider, Grid, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";

interface MessageListProps {
  messages: any;
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const data = [{name :"Ravi",color:'red'},{name :"kavi",color:'blue'},{name :"john",color:'green'},];
  const formatMessage = (message: string) => {
    const parts = message.split('@');
    return parts.map((part, index) => {
      if (index === 0) {
        return <span key={index}>{part}</span>;
      } else {
        const nameEndIndex = part.indexOf(' ') !== -1 ? part.indexOf(' ') : part.length;
        const name = part.substring(0, nameEndIndex);
        const remainder = part.substring(nameEndIndex);
        console.log(name)
        const foundItem = data.find(item => item.name === name);
        const color = foundItem ? foundItem.color : 'black';
        return (
          <React.Fragment key={index}>
            <span style={{ color: color }}>{name}</span>
            {remainder}
          </React.Fragment>
        );
      }
    });
  };
  return (
    <div>
      {messages.messages.map((message: any, index: number) => (
        <Grid>
        <div key={index} style={{fontSize:18,fontWeight:"bold"}}>{formatMessage(message.message)}</div>
        <Divider sx={{marginBlock:1}}/>
        <Grid item container alignItems="center"  sx={{margin:1}}>
            <Grid item>
              <Avatar style={{ backgroundColor: 'blue', color: 'white', }}>
                A
              </Avatar>
            </Grid>
            <Grid item>
              <Typography sx={{marginInline:1,fontSize:18,}}>Admin</Typography>
            </Grid>
          </Grid>
          <Grid item >
            <Typography sx={{marginInline:2,fontSize:18}}>{moment(message.date).format('h:mm:ss a')}</Typography>
          </Grid>
          <Divider sx={{marginBlock:1}}/>
        </Grid>
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(MessageList);
