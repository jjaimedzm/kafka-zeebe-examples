console.group("socket project");
console.log("script running ...");
const socket = io();

//setTimeout(() => {
//  socket.emit("web", {
//    message: "ok"
//  });
//}, 3000);
socket.on("web", data => {
  console.log(data);
  let message = document.getElementById("message");
  message.innerHTML = `<b>${data.message}</b>`;
});
console.groupEnd();
