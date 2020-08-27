function clickme(){
    var inp=prompt("enter you born year");
    var res=0;
    if(inp>0){
         res=(2020-inp)*365;
    }
    
    var h1=document.createElement('h1');
    var text=document.createTextNode('you are '+res+' days old');
    h1.appendChild(text);
    h1.setAttribute('id','res');
    document.getElementById('age').appendChild(h1);
}

function reset(){
    document.getElementById('res').remove();

}
function generatecat(){
    var image=document.createElement('img');
    image.src="https://media.tenor.com/images/eff22afc2220e9df92a7aa2f53948f9f/tenor.gif";
    var divi=document.createElement('div');
    divi.setAttribute('id','remove');
    document.getElementById('generate').appendChild(divi).appendChild(image);
    //divi.style['padding']='10px';
    divi.style['margin']='15px';
    divi.style['boxShadow']='5px 5px 7px 8px #ccc';
}
function removecat(){
   document.getElementById('remove').remove();
    
}

function startgame(choice){
    var yourchoice=choice.id;
    var botchoice=choiceofbot(rand(3));
    console.log(botchoice);
    var results=findresults(yourchoice,botchoice);
    var message=findMessage(results);
    createUI(yourchoice,botchoice,message);
}
function rand(num){
    return Math.floor(Math.random()*num);

}
function choiceofbot(number1){
    priority=["rock","paper","scissor"];
    return priority[number1];
}
function findresults(yourchoice,botchoice){
    var store={
        "rock":{"rock":0.5,"paper":0,"scissor":1},
        "paper":{"rock":1,"paper":0.5,"scissor":0},
        "scissor":{"rock":0,"paper":1,"scissor":0.5}
    }
    return store[yourchoice][botchoice];
}
function findMessage(result){
    var message;
    if(result===1){
        message={
            "msg":"you have won !",
            "coloro":'green'
        }
    }
    else if(result===0){
        message={
            "msg":"you have lost !",
            "coloro":'red' 
        }

    }
    else if(result===0.5){
        message={
            "msg":"Match tied !",
            "coloro":'yellow' 
        }

    }
    return message;
}
function createUI(yourchoice,botchoice,message){
    var Imagestore={
        "rock":document.getElementById('rock').src,
        "paper":document.getElementById('paper').src,
        "scissor":document.getElementById('scissor').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();
    document.getElementById('flex-container-2').innerHTML='<img src="'+Imagestore[yourchoice]+'" height=150px width=150px padding=10px ><h2 style=color:'+message['coloro']+'>'+message['msg']+'</h2>'+
    '<img src="'+Imagestore[botchoice]+'" height=150px width=150px padding=10px >'
}

function changestate(btn){

    if(btn.value==="random"){
        
        var storeColors=['red','green','yellow','pink'];
        console.log(storeColors[rand(4)]);
        
    document.getElementById('btn1').style['background-color']=storeColors[rand(4)];
    document.getElementById('btn2').style['background-color']=storeColors[rand(4)];
    document.getElementById('btn3').style['background-color']=storeColors[rand(4)];
    document.getElementById('btn4').style['background-color']=storeColors[rand(4)];

    }
    else{
    document.getElementById('btn1').style['background-color']=btn.value;
    document.getElementById('btn2').style['background-color']=btn.value;
    document.getElementById('btn3').style['background-color']=btn.value;
    document.getElementById('btn4').style['background-color']=btn.value;
    }

}