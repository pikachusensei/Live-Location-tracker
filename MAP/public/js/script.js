const socket=io()// as we do io() connection req goes to backend that is to app.js,there we will handle it

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude} =position.coords;
        socket.emit("send-location",{latitude,longitude});//now we send the location to server/backend,so we hav to handle it
    },
    (error)=>{
        console.log(error);
    },
    {
        enableHighAccuracy:true,
        maximumAge:0,
        timeout:5000,
    }
);
}

const map=L.map("map").setView([0,0],10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Shreyansh Singh"
}).addTo(map);

const markers={};

//now we got the location from server

socket.on("receive-location",(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude],20);
    if(markers[id]){
        mrkers[id].setlangLng([latitude,longitude]);
    }else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
});

socket.on("user-disconnect",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
    }
})