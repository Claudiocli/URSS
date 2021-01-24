$(document).ready(function(){
    popolaTabellaCarte();
    aggiungiCarta();
    document.getElementById("bottoneGestioneAccount").addEventListener("click", popolaGestioneAccount);
    document.getElementById("btn-logout").addEventListener("click", logout);
  });

function aggiungiCarta(){
    $("#aggiungiCarta").click(show);
}

function show(){
    $("#form").attr("hidden",false);
};

function popolaGestioneAccount(){
    var idUser = getCookie("uid");
    console.log(idUser);
    if (idUser) {
        var data = {
            id: idUser
        }
    $.ajax({
        url: 'http://localhost:9090/account/me',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (risposta) {
            console.log(risposta)
            var ciccia = ""
            ciccia += "<tr>"
            ciccia += "<td>" + "ID" + "</td>"
            ciccia += "<td>" + risposta.id + "</td>"
            ciccia += "</tr>"
            ciccia += "<tr>"
            ciccia += "<td>" + "Indirizzo" + "</td>"
            ciccia += "<td>" + risposta.address + "</td>"
            ciccia += "</tr>"
            ciccia += "<tr>"
            ciccia += "<td>" + "CodiceFiscale" + "</td>"
            ciccia += "<td>" + risposta.cf + "</td>"
            ciccia += "</tr>"
            ciccia += "<tr>"
            ciccia += "<td>" + "Data di Nascita" + "</td>"
            ciccia += "<td>" + risposta.dob + "</td>"
            ciccia += "</tr>"
            ciccia += "<tr>"
            ciccia += "<td>" + "E-mail" + "</td>"
            ciccia += "<td>" + risposta.email + "</td>"
            ciccia += "</tr>"
            ciccia += "<tr>"
            ciccia += "<td>" + "Nome" + "</td>"
            ciccia += "<td>" + risposta.name + "</td>"
            ciccia += "</tr>"
            ciccia += "<tr>"
            ciccia += "<td>" + "Cognome" + "</td>"
            ciccia += "<td>" + risposta.surname + "</td>"
            ciccia += "</tr>"
            $("#corpoGestioneAccount").append(ciccia)
        },
        error: function (err) {
            console.log(err);
        }
    });   
    }
}

function popolaTabellaCarte(){
    var idUser = getCookie("uid");
    console.log(idUser);
    if (idUser) {
        var data = {
            id: idUser
        }
    $.ajax({
        url: 'http://localhost:9090/card/myCard',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (risposta) {
            $("#corpoTabellaCarte").html("");
            for(var i=0 ;i<risposta.length; i++){
                var ciccia = ""
                ciccia += "<tr>"
                ciccia += "<td>" + risposta[i].expiration_date + "</td>"
                ciccia += "<td>" + risposta[i].pan + "</td>"
                ciccia += "</tr>"
                $("#corpoTabellaCarte").append(ciccia)
            }
        },
        error: function (err) {
            console.log(err);
        }
    });   
    }
}

function logout()   {
    eraseCookie('uid');
    window.location.replace("http://localhost:9090/login");
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// L.Russo - funzione per calcolare datatime
function getDateTime(){
    var data = new Date();
    var anno, mese, giorno, ore, minuti, secondi;
    anno = data.getFullYear();
    mese = data.getMonth() + 1;
    giorno = data.getDate();
    ore = data.getHours();
    minuti = data.getMinutes();
    secondi = data.getSeconds();

    var finalDate = giorno + "-" + mese + "-" + anno + " " + ore + ":" + minuti + ":" + secondi;
    
    return finalDate;
}

// L.Russo - funzione per aggiunta carta
function insertCard(){
    var idUser = getCookie("uid");
    var pan = document.getElementById("exampleInputEmail1");
    var holder = document.getElementById("exampleInputEmail1");
    var expiration_date = document.getElementById("mese")+document.getElementById("anno");
    var cvv = document.getElementById("cvc");
    var datetime = getDateTime();

    console.log(idUser);
    if (idUser) {
        var data = {
            pan: pan,
            holder: holder,
            expiration_date: expiration_date,
            cvv: cvv,
            datetime: datetime,
            account: idUser
        }
        $.ajax({
            url: 'http://localhost:9090/card/add',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (risposta) {
                console.log(risposta)
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
}

// Session controll
let isLogged=getCookie("uid");
let localHost="http://localHost:9090";

if (!isLogged)	{
	window.location.replace(localHost+"/login");
}
