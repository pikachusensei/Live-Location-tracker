const express=require("express");
const app=express();
const http=require("http");
const path=require("path");
const socketio=require("socket.io");

const server=http.createServer(app);

const io=socketio(server);


app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

//handliing request
io.on("connection",function(socket){
    socket.on("send-location",function(data){//we received the location on backend
        io.emit("receive-location",{id:socket.id,...data});//we send location to all client whoo are conneted,for all client we have different socket id
    })
    // console.log("connected");
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    })
});

app.get("/",(req,res)=>{
    res.render("index");
});

server.listen(3000);
