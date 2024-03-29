//Calls
$(window).resize(scaler);
$(window).on("load", scaler);
$(window).on("load", mapper);

//Vars
var loc = json("data/locations.json");
console.log(loc);

//Functions
function scaler(){
    let winw = $("#container").width();
    let winh = $("#container").height();

    let mapw = 192;
    let maph = 144;

    let scalew = Math.floor(winw / mapw);
    let scaleh = Math.floor((winh - 48) / maph);

    let scalevalue = Math.min(scalew, scaleh)

    $(":root").get(0).style.setProperty("--scaler", scalevalue);
}

function json(file){
    var json = null;
    $.ajax({
        'async': false,
        'url': file,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}

function mapper(){
    $("<style type='text/css'> </style>").appendTo("head");
    console.log(loc);
    for (let key in loc){
        console.log(loc[key]);
        var vals = [];
        vals.push(key);
        for (let subkey in loc[key]){
            vals.push(loc[key][subkey]);
        }
        console.log(vals);
        $( "#playground" ).append( "<div id='" + vals[0] + "' class='location " + vals[1] + "' onmouseenter='infoDisplay(\"" + vals[2] + "\")' onmouseleave='infoReset()'></div>" );
        $( "style" ).append("#" + vals[0] + "{left: calc(" + vals[3] + " * 8px * var(--scaler)); top: calc(" + vals[4] + " * 8px * var(--scaler)); width: calc(" + vals[5] + " * 8px * var(--scaler)); height: calc(" + vals[6] + " * 8px * var(--scaler));}");
    }
}

function infoDisplay(txt){
    document.getElementById("info").innerHTML = txt;
}

function infoReset(){
    document.getElementById("info").innerHTML = "---";
}