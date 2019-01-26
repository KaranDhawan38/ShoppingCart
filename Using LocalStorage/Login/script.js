var getUser=document.getElementById('signUpForm');//selecting the sign up form/////
var getId=document.getElementById('signInForm');//selecting the sign in form///// 
var userCount=0;

//////on page loading///////////////////////////////////
function load()
{
	userCount=localStorage.getItem("userCount");
}

///////////////When user creates account/////////////////
getUser.addEventListener("submit",function(event){
                                                   var stat;
                                                   var flag=0;												   
	                                               var user=document.getElementById('user');
												   ///////////check for any error in fields////////////
	                                               if(user.checked==true)
												   stat="user"; 													
												   else
												   {
													var code=document.getElementById('code');
                                                    code.addEventListener("keydown",function(event){ document.getElementById('codeerr').innerHTML="";});	
                                                    user.addEventListener("click",function(event){ document.getElementById('codeerr').innerHTML="";});														
													if(code.value=="")
													{
													   document.getElementById('codeerr').innerHTML="Please fill the code*<br>";
													   flag=1;
													}
                                                    else if(code.value!="1234")
													{
													  document.getElementById('codeerr').innerHTML="Incorrect code*<br>";
                                                      flag=1;													  
													}
                                                    else
													{
													 stat="admin";
													}														
												   }
												   /////////check name duplicacy///////////////////
												   var name=document.getElementById('name');
												   name.addEventListener("keydown",function(event){ document.getElementById('nameerr').innerHTML="";});
												   for(var i=0;i<userCount;i++)
													   {
														   var obj=JSON.parse(localStorage.getItem("user"+i));
														   if(obj.name==name.value)
														   {
															flag=1;
															document.getElementById('nameerr').innerHTML="<br>Name is already taken*<br>"; 
                                                            break;															
														   }
													   }
												   /////////Check email address////////////////////
												   var mail=document.getElementById('email');
												   mail.addEventListener("keydown",function(event){ document.getElementById('emailerr').innerHTML="";});
												   if(mail.value.endsWith(".com")==false)
												   {
													 flag=1;
                                                     document.getElementById('emailerr').innerHTML="<br>Invalid email address*<br>";													 
												   }
												   if(flag==0)
												   {
													   for(var i=0;i<userCount;i++)
													   {
														   var obj=JSON.parse(localStorage.getItem("user"+i));
														   if(obj.email==mail.value)
														   {
															flag=1;
															document.getElementById('emailerr').innerHTML="<br>Email address already taken*<br>"; 
                                                            break;															
														   }
													   }
												   }
												   /////////Every condition is satisfied///////////
												   if(flag==0)
												   {
													 var user=new Object;   
													 user={
														    name:document.getElementById('name').value,
															email:document.getElementById('email').value,
															pass:document.getElementById('pass').value,
															selection:stat
													      };
													 var userString=JSON.stringify(user);		 
                                                     localStorage.setItem("user"+userCount,userString);
                                                     userCount++;	
                                                     localStorage.setItem("userCount",userCount);
													 alert("Account Created!!!");
												   }
												   //////////Not satistfied///////////////////////
												   else
												   event.preventDefault();	   
                                                 });
												  
///////////////When user signs in page///////////////////////////////////////////////////////////////////////												 
getId.addEventListener("submit",function(event){
	                                             flag=0;
												 var obj;
												 var current;
	                                             ////////////Validate email id/////////////////////
												 var mail=document.getElementById('mail');
												 var pass=document.getElementById('password');
												 mail.addEventListener("keydown",function(event){ document.getElementById('mailerr').innerHTML="";});
												 pass.addEventListener("keydown",function(event){ document.getElementById('passworderr').innerHTML="";});
												 for(var i=0;i<userCount;i++)
												  {
												    obj=JSON.parse(localStorage.getItem("user"+i));
												    if(obj.email==mail.value)
												     {
													  flag=1;
													  current=i;
                                                      break;															
												     }
												  }
												  if(flag==0)
												  {
													document.getElementById('mailerr').innerHTML="<br>Email address not found*<br>";
                                                    event.preventDefault();														
												  }
												  else
												  {
													/////////validating password/////////////////////////////////////////////////// 
													if(pass.value==obj.pass)
													{	
													  sessionStorage.setItem("currentUser",current);	
													  if(obj.selection=="admin")
													  window.location.replace("file:///C:/Users/Karans/Desktop/HTML/UCA/Cart/Using LocalStorage/Seller/index.html");	  
                                                      else
													  window.location.replace("file:///C:/Users/Karans/Desktop/HTML/UCA/Cart/Using LocalStorage/Buyer/index.html");
                                                      event.preventDefault();												  
													}
                                                    else
													{
														document.getElementById('passworderr').innerHTML="<br>Incorrect Password*<br>";
                                                        event.preventDefault();	
													}														
												  }
                                               });												 
												 												 