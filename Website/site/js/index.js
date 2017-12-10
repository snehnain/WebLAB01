
// This is your JS Entry point... You can add as many as JS files you want if you think it is better!
import axios from 'axios';

/*
*  Check Function 
*/
document.getElementById('checkVal').onclick = function()
{
	var resultElement = document.getElementById('answerStr');
	var v1 = document.getElementById('eqStr').value;

	axios.post('http://localhost:8081/', {formula: v1})
	.then((response) =>
	{
		var inputtxt = v1;
		console.log(inputtxt);
		window.alert(inputtxt);
		var len=inputtxt.length;
		var data = inputtxt;
		var regex = /(^[\d]+)([\*\-\/\+])(([\d]+)?)([\*\-\/\+]?)(([\d]+)?)([\*\-\/\+]?)(([\d]+)?)([\*\-\/\+]?)(([\d]+)?)([\*\-\/\+]?)(([\d]+)?)([\*\-\/\+]?)(([\d]+)?)([\*\-\/\+]?)([\d]+$)/;
		//var regex = /^[\d]+[\*\-\/\+][\d]+$/;
		var result = regex.test(inputtxt);
		var div = "/";
		var zer = "0";
		var sym = inputtxt.split("");
		console.log(result);
		console.log(len);
		console.log(sym);
		
		if(len!=0){
			if(result === true){
				for (var i=1;i<len;i++){
					if (sym[i]===div && sym[i+1]===zer)
					{
                        window.alert("Math Error");
                        exit;
					}
				}
                resultElement.innerHTML = 'Valid Input';
            }
            else{
				  window.alert("Syntax error");
			}
		}
		console.log(result);
	})
	.catch((error) =>
	{
        //window.alert("Invalid Input");
        resultElement.innerHTML = 'Invalid Input';
	})

}
/*
*  	Evaluate Function
*/
document.getElementById('calculate').onclick = function()
{
    var resultElement = document.getElementById('answerStr');
    var v1 = document.getElementById('eqStr').value;

	axios.post('http://localhost:8081/', {formula: v1})
	.then((response) =>
	{
		resultElement.innerHTML = eval(v1);
	})
	.catch((error) =>
	{
    resultElement.innerHTML = 'Syntax error';
	})

}