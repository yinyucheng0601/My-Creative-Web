$(".box").click(function(){
  var state =   $(this).css("background-color")
  var id = $(this).attr("data-id")
 // console.log(id)
  
 // console.log(state)
  if (state=="rgb(255, 255, 25)"){
    
    $(this).css("background-color",'white')
  }else{
    
    $(this).css("background-color",`rgb(${150+Math.random()*85},${100+Math.random()*135},${210+Math.random()*25})`)
  }
  
})