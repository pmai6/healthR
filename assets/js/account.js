var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
function check(form) { /*function to check userid & password*/
                /*the following code checkes whether the entered userid and password are matching*/
    if(form.userid.value == "myuserid" && form.pswrd.value == "mypswrd") {
        window.open('account.html')/*opens the target page while Id & password matches*/
    }
    else {
        alert("Error Password or Username")/*displays error message*/
    }
}