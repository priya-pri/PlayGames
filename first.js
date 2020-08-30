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


//challenge for blackjack
var blackjack={
        'you':{
            'id':'#blackjackyou',
            'score':'#youscore',
            'result':0,

        },
        'dealer':{
            'id':'#blackjackdealer',
            'score':'#dealerscore',
            'result':0,

        },
        'wins':0,
        'losses':0,
        'draw':0,

    
        'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
        'cardscore':{
            '2':2,
            '3':3,
            '4':4,
            '5':5,
            '6':6,
            '7':7,
            '8':8,
            '9':9,
            '10':10,
            'K':10,
            'J':10,
            'Q':10,
            'A':[1,11],
        },
        'isstand':false,
        'isturnovers':false,

    
}

var dealerresult=0;
var cashsound=new Audio('sounds/cash.mp3');
var awwsound=new Audio('sounds/aww.mp3');
var swishsound=new Audio('sounds/swish.m4a');
document.querySelector('#blackjackhit').addEventListener('click',blackjackhit);
document.querySelector('#blackjackstand').addEventListener('click',blackjackstand);
document.querySelector('#blackjackdeal').addEventListener('click',blackjackdeal);

function blackjackhit(){
    if(blackjack['isstand']===false){
    blackjackcard(blackjack['you']);}
}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function blackjackcard(user){

    if(user===blackjack['you']){
    if(user['result']<21){
    var num=rand(blackjack['cards'].length)
    if(blackjack['cards'][num]==='A'){
        if(user['result']+blackjack['cardscore'][blackjack['cards'][num]][1]<=21){
            user['result']+=blackjack['cardscore'][blackjack['cards'][num]][1];

        }
        else{
            user['result']+=blackjack['cardscore'][blackjack['cards'][num]][0];
        }
    }
    else{
        user['result']+=blackjack['cardscore'][blackjack['cards'][num]];
    }
    
    showcard(user,blackjack['cards'][num]);
    showresult(user);}}

    else if(blackjack['dealer']===user){

        while(blackjack['dealer']['result']<=16 && blackjack['isstand']===true){

        if(user['result']<21){
            var num=rand(blackjack['cards'].length)
            if(blackjack['cards'][num]==='A'){
                if(user['result']+blackjack['cardscore'][blackjack['cards'][num]][1]<=21){
                    user['result']+=blackjack['cardscore'][blackjack['cards'][num]][1];
        
                }
                else{
                    user['result']+=blackjack['cardscore'][blackjack['cards'][num]][0];
                }
            }
            else{
                user['result']+=blackjack['cardscore'][blackjack['cards'][num]];
            }
            
            showcard(user,blackjack['cards'][num]);
            showresult(user);}
            await sleep(1000);
           
        }
        blackjack['isturnovers']=true;
        showoutput(findwinner(blackjack['you'],blackjack['dealer']));


    }

    
    
    

}
function showcard(user,card){
    var cardImage=document.createElement('img');
    cardImage.src=(`images/${card}.png`);
    cardImage.setAttribute('height','150px');
    cardImage.setAttribute('width','150px');
    cardImage.style['margin']='4px';
   
    document.querySelector(user['id']).appendChild(cardImage);
    swishsound.play();

}
function blackjackdeal(){
    console.log("hi");
    //var youlen= document.querySelector('#blackjackyou').getElementsByTagName('img').length;
    //var dealerlen=document.querySelector('#blackjackdealer').getElementsByTagName('img').length;


    if(blackjack['isstand']===true && blackjack['isturnovers']===true){
        blackjack['isstand']=false;
        blackjack['isturnovers']=false;

    var youlen= document.querySelector('#blackjackyou').querySelectorAll('img');
    var dealerlen=document.querySelector('#blackjackdealer').querySelectorAll('img');
    console.log(findwinner(blackjack['you'],blackjack['dealer']));
    
    
    
    for(i=0;i<youlen.length;i++){
       // document.querySelector('#blackjackyou').querySelector('img').remove();
       youlen[i].remove();
    }
    for(i=0;i<dealerlen.length;i++){
       // document.querySelector('#blackjackdealer').querySelector('img').remove();
       dealerlen[i].remove();
    }

    document.querySelector('#blackjackresult').textContent="let's play";
    document.querySelector('#blackjackresult').style['color']='black';
    
   blackjack['you']['result']=0;
   blackjack['dealer']['result']=0;

    document.querySelector(blackjack['you']['score']).textContent= blackjack['you']['result'];
    document.querySelector(blackjack['dealer']['score']).textContent= blackjack['dealer']['result'];}
   
}
function showresult(user){
    if(user['result']>21){
        document.querySelector(user['score']).textContent='BUST!';
    }
    else
    document.querySelector(user['score']).textContent=user['result'];
}
function blackjackstand(){
    /*if(blackjack['dealer']['result']<=16){
       

    }*/
    blackjack['isstand']=true;
    if(blackjack['isturnovers']===false){
        blackjackcard(blackjack['dealer']);
    }
   
   
   // showoutput(findwinner(blackjack['you'],blackjack['dealer']));
    
}
var winner;

function findwinner(you,dealer){


    if(you['result']==dealer['result']){
        winner='no';
    }

    
    else if(you['result']<=21){
        if(dealer['result']>21){
            winner=you;
           
        }
        else if(you['result']>dealer['result']){
            winner=you;
        }
        else if(you['result']<dealer['result']){
            winner=dealer;
        }
    }
    else if(you['result']>21){
        if(dealer['result']<21){
            winner=dealer;
        }
       else{
           winner='no';
       }
    }
    return winner;
}

function showoutput(output){
    if(output===blackjack['you']){
        blackjack['wins']++;
        document.querySelector('#blackjackresult').textContent='you win';
        document.querySelector('#blackjackresult').style['color']='green';
        document.querySelector('#Wins').textContent= blackjack['wins'];
        cashsound.play();

    }
    else if(output===blackjack['dealer']){
        blackjack['losses']++;
        document.querySelector('#blackjackresult').textContent='you lose';
        document.querySelector('#blackjackresult').style['color']='red';
        document.querySelector('#Loses').textContent=  blackjack['losses'];
        awwsound.play();
    }
    else{
        blackjack['draw']++;
        document.querySelector('#blackjackresult').textContent='you drew';
        document.querySelector('#blackjackresult').style['color']='yellow';
        document.querySelector('#Draws').textContent=  blackjack['draw'];

    }
}