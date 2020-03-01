var spa = require('child_process').spawn('node',['tests/a.js'],{
  shell:true
});

var spa2 = require('child_process').spawn('node',['tests/b.js'],{
  shell:true
});

spa.stdout.on('data',(data)=>{
  console.log(data.toString())
})

spa2.stdout.on('data',(data)=>{
  console.log(data.toString())
})
