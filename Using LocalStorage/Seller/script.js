var arr=[];//array of objects in which items details are stored
var count=0;//to maintain count of items 
var lock=0;// to lock the display of add items
var Id;//to get value of currect selection
var selectDiv1=document.getElementById("input");//selecting the input div
var selectDiv2=document.getElementById("display");//selecting the display div
var selectAnchor=document.getElementById('a1');//selecting add items anchor tag
var selectSearch=document.getElementById('search');//selecting search button
var safe=0;
var current;/////////it tells about current user/////////////////

///////////////////event on search button/////////////////////////
selectSearch.addEventListener("keyup",function(event){
	                                                      searchItem();
                                                     });			   
			   
			   
			   
/////////////////event on add items anchor/////////////////////
selectAnchor.addEventListener("click",function(event){
	                                                   lock=1;
													   show();	 
													 });
													 
/////////////////To retrive data from local storage////////////////////
function Load(){
	            current=sessionStorage.getItem("currentUser");
				 if(current==null)
                 {
	              alert("Session expired please login!!!");
                  window.location.replace("file:///C:/Users/Karans/Desktop/HTML/UCA/Cart/Using LocalStorage/Login/index.html");	
                 }
				 else
				 {
					obj=JSON.parse(localStorage.getItem("user"+current));
                    var info=document.getElementById('logout').innerHTML;
                    document.getElementById('logout').innerHTML=obj.name+"<br>"+info;
	                safe=1;
              	    var Count=localStorage.getItem("storedCount");
				    for(var i=0;i<Count;i++)
				    {
				     var data=localStorage.getItem("storedData"+i);
				     data=data.split(',');
                     show();
				     for(var j=0;j<4;j++)
				     { 
					  document.getElementById('in'+j).value=data[j+1]; 
				     }
				     hide(1);
				    }
				    safe=0;
                    var users=localStorage.getItem("userCount");
					var x=0;
                    for(var i=0;i<users;i++)
					{
						var data=JSON.parse(localStorage.getItem("user"+i));
						var name=data.name;
						var orders=localStorage.getItem(name+"placeCount");
						if(orders==null);
						else
						{
							for(var j=0;j<orders;j++)
							{
								data=JSON.parse(localStorage.getItem(name+"order"+j));
								addOrders(data,x++);
							}
						}
					}						
				 }               
	           }
			   
////////////////Adding the retrived orders in div////////////////
function addOrders(data,i)
{
	  var placeDiv=document.getElementById('orders');
	  //////////////creating new div////////////////////////////////			
	  var createDiv = document.createElement("div");
	  createDiv.setAttribute("id","pdiv"+i);
	  createDiv.setAttribute("class","itemsList");
	  placeDiv.appendChild(createDiv);
	  /////////////creating a ul in current div///////////////////////
	  var createList = document.createElement("ul");
	  createList.setAttribute("id","pul"+i);
	  document.getElementById("pdiv"+i).appendChild(createList);
	  /////////////Adding items in li////////////////////////////////////////
	  for(var j=0;j<4;j++)
		{
			var createli = document.createElement("li");
			createli.setAttribute('class',"c7");		 
			if(j==0)
			var textnode = document.createTextNode(data.Id);   																 
			else if(j==1)
			var textnode = document.createTextNode(data.Status);	 
			else if(j==2)	
			var textnode = document.createTextNode(data.Time);	
            else
            var textnode = document.createTextNode(data.Address);  				
			createli.appendChild(textnode);																 
			document.getElementById("pul"+i).appendChild(createli);																 
		}
      	 var createDel = document.createElement("input");
		 createDel.setAttribute("id","pedit"+i);
		 createDel.setAttribute ("type","button");
		 createDel.setAttribute("class","editp");
		 createDel.setAttribute("value","Edit Status");
		 createDel.addEventListener("click",function(event){
			                                                 var currentStatus=document.getElementById('pul'+i).childNodes[1].innerHTML;  
															 var newStatus=prompt("Enter new status:- ",currentStatus);
															 if(newStatus==null);
															 else
															 {
																 var orderId=parseInt(document.getElementById('pul'+i).childNodes[0].innerHTML);
																 var users=localStorage.getItem("userCount");
																 for(var t=0;t<users;t++)
																 {
																	 var Data=JSON.parse(localStorage.getItem("user"+t));
																	 var name=Data.name;
																	 var orders=localStorage.getItem(name+"placeCount");
																	 if(orders==null);
																	 else
																	 {
																		 for(var j=0;j<orders;j++)
																		 {
								                                          var order=JSON.parse(localStorage.getItem(name+"order"+j));
								                                          if(order.Id==orderId)
																		  {
																			order.Status=newStatus;
																			var str=JSON.stringify(order);
                                                                            localStorage.setItem(name+"order"+j,str);
                                                                            window.location.replace("file:///C:/Users/Karans/Desktop/HTML/UCA/Cart/Using LocalStorage/Seller/index.html");																			
																		    break;  
																		  }
							                                             }
						                                             }
					                                             }   																
															 }
														   });
		document.getElementById("pdiv"+i).appendChild(createDel);	
} 			   

////////////////Searching item///////////////////////////////////
function searchItem()
{
	for(var i=0;i<count;i++)
	{
		var item=document.getElementById('ul'+i).childNodes[1].innerHTML;
		var toSearch=selectSearch.value;
		var n=item.startsWith(toSearch);
		if(n==false)
		document.getElementById('idiv'+i).style.display="none";
	    else
		document.getElementById('idiv'+i).style.display="block";	
	}
}			   
				  
//////////////////Opening the input fields///////////////////////////////
function show()
                              {							
                               var name=["Name...","Quantity...","Price...","Description..."];							   
							   /////////////creating 3 textbox////////////////////
                               for(var i=0;i<3;i++)
                               {  		
						          var getError = document.createElement("label");
								  getError.setAttribute("id","llb"+i);
								  getError.setAttribute("class","error");
								  selectDiv1.appendChild(getError);
								  var getInput = document.createElement("input");
								  getInput.setAttribute("id", "in"+i);
								  getInput.setAttribute("title",name[i]);
								  if(name[i]=="Quantity..." || name[i]=="Price...")
								  getInput.setAttribute("type","number");	  
								  else	  
                                  getInput.setAttribute("type","text");
				                  getInput.setAttribute("placeholder",name[i]);	
								  getInput.setAttribute("class", "inputFields");
                                  getInput.addEventListener("keydown",function(event){
								                                                      refresh();
							                                                         });
                                  selectDiv1.appendChild(getInput);																													  
                               }
							   //////////////creating textarea/////////////////////////
							   var getError = document.createElement("label");
							   getError.setAttribute("id", "llb"+i);
							   getError.setAttribute("class","error");
							   selectDiv1.appendChild(getError);
							   var getInput = document.createElement("textarea");
                               getInput.setAttribute("id", "in"+i);
                               getInput.setAttribute("title",name[i]);							   
				               getInput.setAttribute("placeholder",name[i]); 
                               getInput.setAttribute("rows", 5);
							   getInput.setAttribute("class", "inputFields");
                               getInput.setAttribute("cols", 22);
							   getInput.addEventListener("keydown",function(event){
								                                                   refresh();
							                                                      })  ; 				
							   selectDiv1.appendChild(getInput);
							   /////////////creating submit button//////////////////
                               var getButton = document.createElement("input");
							   getButton.setAttribute("id", "bt0");
							   getButton.setAttribute("value", "Submit");	
							   getButton.setAttribute("class", "inputButton");
							   getButton.setAttribute("type", "button");
							   getButton.addEventListener("click",function(event){
								                                                  hide(1);
							                                                     })  ;							   
							   selectDiv1.appendChild(getButton);
							   //////////////creating cancel button////////////////////
                               var getButton = document.createElement("input");
							   getButton.setAttribute("id", "bt1");
							   getButton.setAttribute("value", "Cancel");	
							   getButton.setAttribute("type", "button");
							   getButton.setAttribute("class", "inputButton");
							   getButton.addEventListener("click",function(event){
								                                                  hide(0);
							                                                     })  ;							   
							   selectDiv1.appendChild(getButton);
                               ///////////hiding add items anchor///////////////////////						   
                               selectAnchor.style.display='none';
                              }

function save()
{
	localStorage.setItem("storedCount",count);
	for(var i=0;i<count;i++)
	{
	 localStorage.setItem("storedData"+i,arr[i].product);	
	}	
}							  
				  
function hide(n)
{
	////////If cancel is pressed////////////////
	if(n==0)
	{
		for(var i=12;i>=3;i--)
		selectDiv1.removeChild(selectDiv1.childNodes[i]);
	    selectAnchor.style.display='block';
		lock=0;
	}
	////////If submit is pressed////////////////
    else if(n==1)
	{
		/////////////Error checking in input fields//////////////////////////////////
		var flag=0;
		for(var i=0;i<4;i++)
		{
		  if(document.getElementById('in'+i).value=="")
		  {  
			flag=1;
            document.getElementById('llb'+i).innerHTML="Required*";						
		  }  
		}
		if(document.getElementById('in3').value.length<10)
		 {
			document.getElementById('llb3').innerHTML="Min 10 Characters*";	 
			flag=1;
		 }	
		  if(document.getElementById('in0').value.length<3)
		  {
			document.getElementById('llb0').innerHTML="Min 3 Characters*";	
			flag=1;
		  }
		  /*for(var j=0;j<=9;j++)
		  {
			if(document.getElementById('in0').value.includes(j,0)==true)
		    {
			 document.getElementById('llb0').innerHTML="Name cannot contain number*";	
			 flag=1;
			 break;
		    }  
		  }*/
		/////////////////////If all fields are satisfied/////////////////////  
		if(flag==0)
		{
         if( document.getElementById('bt0').value=="Update")
		 {
			 var y=arr[Id].product[0];
			 arr[Id]=new Object();
             arr[Id]={
			                   product:[y,
					           document.getElementById('in0').value,
					           document.getElementById('in1').value,
					           document.getElementById('in2').value,
					           document.getElementById('in3').value]
		                }			
			var item = document.getElementById("ul"+Id);
			for(var i=1;i<5;i++)
			{
			 item.childNodes[i].innerHTML=arr[Id].product[i];		
			}
		 }
         else
		 {
		//////////creating new object////////////////////////////////	 
	     arr[count]=new Object();
         arr[count]={
			          product:[count,
					           document.getElementById('in0').value,
					           document.getElementById('in1').value,
					           document.getElementById('in2').value,
					           document.getElementById('in3').value]
		            }
		//////////////creating new div////////////////////////////////			
		 var createDiv = document.createElement("div");
		 createDiv.setAttribute("id","idiv"+count);
		 createDiv.setAttribute("class","items");
         selectDiv2.appendChild(createDiv);
		 /////////////creating a ul in current div///////////////////////////
		 var createList = document.createElement("ul");
		 createList.setAttribute("id","ul"+count);
		  document.getElementById("idiv"+count).appendChild(createList);
		 for(var i=0;i<5;i++)
		 {
		  var createli = document.createElement("li");
		  if(i==0)
		  {
			createli.setAttribute("class","index");  
			var textnode = document.createTextNode((arr[count].product[i])+1);  
		  }  
	      else
		  var textnode = document.createTextNode(arr[count].product[i]);	  
		  createli.appendChild(textnode);
          document.getElementById("ul"+count).appendChild(createli);
          if(i!=4)		  
		  document.getElementById('in'+i).value="";
		 }												
        /////////creating a button to delete item//////////////////////////													
		 var createDel = document.createElement("input");
		 createDel.setAttribute("id",count);
		 createDel.setAttribute ("type","button");
		 createDel.setAttribute("class","delete");
		 createDel.setAttribute("value","X");
		 createDel.addEventListener("click",function(event){
			                                                    ///////delete item from array////////
			                                                     var getId=event.target.id;
													             for(var x=0;x<count;x++)
							      								   {
    																   if(x==getId)
																	   {
			   														     while(x!=count-1)
															              {
																		   arr[x]=arr[x+1];
																		   x++;
																		  }  
																       }
															       }
																  ////////updating ids of div/ul/button/////// 
                                                                  for(var x=parseInt(getId)+1;x<count;x++)
																  {  
															        var y=x-1;
															        document.getElementById(x).parentElement.id='idiv'+y;
																	document.getElementById('ul'+x).childNodes[0].innerHTML=x;
																	document.getElementById('ul'+x).id='ul'+y;
																	document.getElementById(x).id=y;//delete button
																	document.getElementById(x).id=y;//edit button
																  }																	  
																  count--;
                                                                  save();																  
																  ////////////deleting the item from screen//////////////////////////////////
																  event.target.parentElement.parentElement.removeChild(event.target.parentElement);
														   });
		document.getElementById("idiv"+count).appendChild(createDel);																					 
        ///////////////creating edit button/////////////////////
		 var edit = document.createElement("input");
		 edit.setAttribute("id",count);
		 edit.setAttribute("type","button");
		 edit.setAttribute("class","edit");
		 edit.setAttribute("value","Edit");
		 edit.addEventListener("click",function(event){
			                                            if(lock==0)
														show();
														document.getElementById('bt0').value="Update";
														Id=event.target.id;
														for(var i=0;i<4;i++)
													     {
													      document.getElementById('in'+i).value=arr[Id].product[i+1];
														 }
														lock=1;
													  })                                      
		 document.getElementById("idiv"+count).appendChild(edit);	 
		 count++;		 
		 }
         hide(0);		 
		}
	}
	if(safe==0)
	save();
}

//////////it clear all errors/////////////////////
function refresh()
{
	for(var i=0;i<4;i++)
	document.getElementById('llb'+i).innerHTML="";
}

//////////////Loging out of page///////////////////////////////////////////
document.getElementById('logout').addEventListener("click",function(event){
	                                                                        window.location.replace("file:///C:/Users/Karans/Desktop/HTML/UCA/Cart/Using LocalStorage/Login/index.html");
                                                                          });