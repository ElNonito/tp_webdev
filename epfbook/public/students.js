document.addEventListener("DOMContentLoaded", function (event) {

    var anchor = document.createElement('a'); 
    var link = document.createTextNode("my link");
    anchor.appendChild(link); 
    anchor.href = "https://developer.mozilla.org/fr/docs/orphaned/Web/API/ParentNode/append#ajouter_un_%C3%A9l%C3%A9ment"
    document.body.appendChild(anchor); 

    button =document.querySelector("button")
    button.addEventListener("click",function(event){alert("cliked")})
});
