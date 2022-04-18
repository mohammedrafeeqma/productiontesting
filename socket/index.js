const io = require("socket.io")(8900, {
  cors: {
    origin: "http://127.0.0.1:3001",
  },
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log(555);
    console.log(users)
    return users.find((user) => user.userId === userId)
}


//connection
io.on("connection", (socket) => { 
  console.log("user is connected.");
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
   
      //  addUser('622ca39b28782d07e0b8f754','NrrCWih6jYSPtAE3AAAF')
   
         addUser(userId, socket.id);
    io.emit("getUsers", users); 
    
  })


  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text}) => {
      const user = getUser(receiverId)
      console.log(text)
      // console.log(user);
      io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
      })
  })

  //send notification
  // socket.on("sendNotification", ({ senderName, receiverName, type }) => {
  //   const receiver = getUser(receiverName);
  //   console.log(11);
  //   console.log(senderName, receiverName, type);
  //   console.log(receiver);
  //   io.to(receiver?.socketId).emit("getNotification", {
  //     senderName,
  //     type,
  //   });
  //   console.log(22);
  // });

  // disconnection
  socket.on("disconnect", () => {
    console.log(" a user is disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
