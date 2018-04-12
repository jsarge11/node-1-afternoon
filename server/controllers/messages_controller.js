let messages = []
let id = 0

module.exports = {

 allowCrossDomain: (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
 },

 read: (req, res) => {
  res.status(200).send( messages );
 },

 create: (req, res) => {
  let message = {
   text: req.body.text,
   time: req.body.time,
   id: id,
   name: req.body.name
  }
  id++;

  messages.push(message);
  res.status(200).send( messages );
 },

  update: (req, res) => {
   let index = null; // does this allow me to set this to any type
   
   messages.forEach((message, i) => {
    if (message.id === +req.params.id) index = i;
   }) 

   messages[index] = {
    id : messages[index].id,
    text : req.body.text || messages[index].text,
    time : req.body.time || messages[index].time
   }
   console.log(req.body.text);
   
    res.status(200).send( messages );
   },

   delete: (req, res) => {
    console.log("BAHLETED");
    let index = null; // does this allow me to set this to any type
   messages.forEach((message, i) => {
    if (message.id === +req.params.id) index = i;
   }) 

    messages.splice(index, 1);

    res.status(200).send( messages );
   }
}