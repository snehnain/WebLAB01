
// This is your JS Entry point... You can add as many as JS files you want if you think it is better!
/*
* Import axios by writing command "npm install axios --save-dev" on your website folder
*/
import axios from 'axios';

/*
* ==============Check Function================== 
*/
document.getElementById('checkVal').onclick = function()
{
	/*
	* Variable Declaration
	*/
	var resultElement = document.getElementById('answerStr');
	var v1 = document.getElementById('eqStr').value;

	axios.post('http://localhost:8081/', {formula: v1})
	.then((response) =>
	{
		var inputtxt = v1;
		console.log(inputtxt);
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
		/*
		* Checking if length is not zero then enter in the loop otherwise go to catch
		*/
		if(len!=0){
			/*
			* Check whether input data is correct or not. If not then show alert box Syntax Error
			*/
			if(result === true){
				/*
				* Loop
				*/
				for (var i=1;i<len;i++){
					/*
					* Checking Math's operation like value/0 then Math Error
					*/
					if (sym[i]===div && sym[i+1]===zer)
					{
                        window.alert("Math Error");
						return;
					}
				}
                resultElement.innerHTML = 'Valid Input. Now press Evaluate button';
            }
            else{
				window.alert("Syntax error");
			}
		}
		console.log(result);
	})
	.catch((error) =>
	{
        window.alert("Invalid Input");
	})

}
/*
* =================End of Check Function==================
*/



/*
*  	==============Evaluate Function=======================
*/
document.getElementById('calculate').onclick = function()
{
	/*
	* Variable Declaration
	*/
    var resultElement = document.getElementById('answerStr');
    var v1 = document.getElementById('eqStr').value;
	
	axios.post('http://localhost:8081/', {formula: v1})
	.then((response) =>
	{
		var data = v1;
		var sp=data.split(/(\d+)/);
		var len=v1.length; 			//Calculating length
		var sum="+";
		var sub="-";
		var div="/";
		var mul="*";
		console.log(len);
		console.log(sp);
		var result=0;
		result=parseInt(sp[1]);
		/*
		* Loop for checking the math's operation "+,-,*,/"
		*/
		for (var j=1;j<len;j++)
		{ 
			console.log(sp[j]);
			if(sp[j]===sum)
				result=result+parseInt(sp[j+1]);
			if(sp[j]===sub)
				result=result-parseInt(sp[j+1]);
			if(sp[j]===div)
				result=result/parseInt(sp[j+1]);
			if(sp[j]===mul)
				result=result*parseInt(sp[j+1]);
		}
			
		console.log(result);
		resultElement.innerHTML = result;
	})
	.catch((error) =>
	{
		window.alert("Invalid Input");
	})

}
/*
* =================End of Evaluate Function====================
*/