var selectList=document.getElementById('itemList');//selecting div1 of item list
var selectCart=document.getElementById('cart');//selecting div2 of display cart
var selectSearch=document.getElementById('search');//selecting search button
var count;
var cartCount=0;
var arr=[];
var current;////to get the current user id///////////////////////////////
var obj;//////user info/////////////////////////////////////////////////
var currentId=0;
var placeCount=0;

///////////////////event on search button/////////////////////////
selectSearch.addEventListener("keyup",function(event){
	                                                   searchItem();
                                                     });

/////////Retriving data from local storage//////////
function load()
{
  /////retrive stored items that are available/////////////////////	
  count=localStorage.getItem("storedCount");
  for(var i=0;i<count;i++)
  {
	var data=localStorage.getItem("storedData"+i);
    data=data.split(',');
    insert(data);	
  }
  ////////retrive current user and his cart/////////////////////////////////////
  current=sessionStorage.getItem("currentUser");
  if(current==null)
  {
	alert("Session expired please login!!!");
    window.location.replace("file:///C:/Users/Karans/Desktop/HTML/UCA/Cart/Login/index.html");	
  }
  else
  {
    obj=JSON.parse(localStorage.getItem("user"+current));
    var info=document.getElementById('logout').innerHTML;
    document.getElementById('logout').innerHTML=obj.name+"<br>"+info;
    var x=localStorage.getItem(obj.name+"storedCartCount");
    for(i=0;i<x;i++)
    {
	 var data=localStorage.getItem(obj.name+"storedCartData"+i);
     data=data.split(',');
     showRetrivedData(data);
	 Total();
    }
    ///////retrive the orders of user/////////////////////////////////////
    currentId=localStorage.getItem("currentId");
    placeCount=localStorage.getItem(obj.name+"placeCount");
    for(var i=0;i<placeCount;i++)
    {
	 var data=JSON.parse(localStorage.getItem(obj.name+"order"+i));
	 placeOrder(data,i);  
    }
  }	  
}

//////////////Show retrived data on cart/////////////////////////////////////
function showRetrivedData(data)
{
	var cartDiv=document.getElementById('cartItems');
	//////////////creating new div////////////////////////////////			
	var createDiv = document.createElement("div");
	createDiv.setAttribute("id","cdiv"+cartCount);
	createDiv.setAttribute("class","itemsList");
	cartDiv.appendChild(createDiv);
	/////////////creating a ul in current div///////////////////////
	var createList = document.createElement("ul");
	createList.setAttribute("id","ulc"+cartCount);
	document.getElementById("cdiv"+cartCount).appendChild(createList);
	/////////////Adding items in li////////////////////////////////////////
	for(var i=0;i<4;i++)
		{
			var createli = document.createElement("li");
			createli.setAttribute('class',"c4");		 
            var textnode = document.createTextNode(data[i]);  				
			createli.appendChild(textnode);																 
			document.getElementById("ulc"+cartCount).appendChild(createli);																 
		}
	   	////////////Adding item to array//////////////////////////////////////
	    arr[cartCount]=new Object();
        arr[cartCount]={
			               product:[document.getElementById('ulc'+cartCount).childNodes[0].innerHTML,
								    document.getElementById('ulc'+cartCount).childNodes[1].innerHTML,
								    document.getElementById('ulc'+cartCount).childNodes[2].innerHTML,
								    document.getElementById('ulc'+cartCount).childNodes[3].innerHTML]
		               }	
       /////////creating a button to delete item//////////////////////////													
		 var createDel = document.createElement("input");
		 createDel.setAttribute("id","del"+cartCount);
		 createDel.setAttribute ("type","button");
		 createDel.setAttribute("class","delete");
		 createDel.setAttribute("value","X");
		 createDel.addEventListener("click",function(event){
			                                                 Delete(event);
															 Total();
															 save();
														   });
		document.getElementById("cdiv"+cartCount).appendChild(createDel);
        var cname=document.getElementById('ulc'+cartCount).childNodes[1].innerHTML;
	    for(var i=0;i<count;i++)
	    {
		 var name=document.getElementById('ul'+i).childNodes[1].innerHTML;
		 if(name==cname)
		 {
			document.getElementById('idiv'+i).childNodes[4].value="Item Added";
			document.getElementById('idiv'+i).childNodes[2].value=data[2];
			break;
		 }
	    } 
	cartCount++;
}

//////////Inserting data in itemlist////////////////
function insert(data)
{
	     //////////////creating new div////////////////////////////////			
		 var createDiv = document.createElement("div");
		 createDiv.setAttribute("id","idiv"+data[0]);
		 createDiv.setAttribute("class","items");
         selectList.appendChild(createDiv);
		 /////////////creating a ul in current div///////////////////////
		 var createList = document.createElement("ul");
		 createList.setAttribute("id","ul"+data[0]);
		 document.getElementById("idiv"+data[0]).appendChild(createList);
		 /////////////Adding items in li////////////////////////////////////////
		 for(var i=0;i<5;i++)
		 {
		  if(i==2);
          else
		  {
			var createli = document.createElement("li");
		  if(i==0)
		  {
			createli.setAttribute("class","index");  
			var textnode = document.createTextNode(parseInt(data[i])+1);  
		  }		  
	      else
		  var textnode = document.createTextNode(data[i]);	  
		  createli.appendChild(textnode);
          document.getElementById("ul"+data[0]).appendChild(createli);  
		  }			  
		 }
        //////////////Creating item quantity - button/////////////////////////////
         var createPlus = document.createElement("input");
		 createPlus.setAttribute ("type","button");
		 createPlus.setAttribute("class","addSub");
		 createPlus.setAttribute("id",data[0]);
		 createPlus.setAttribute("value","-");
		 createPlus.addEventListener("click",function(event){
			                                                  var id=event.target.id;
                                                              var val=document.getElementById('val'+id);
                                                              if(val.value=='1');
                                                              else
															  {  
																val.value=parseInt(val.value)-1;																
															  }									
															  setQuantity(event);
															  Total();
															  save();
														    });
		 document.getElementById("idiv"+data[0]).appendChild(createPlus);
        //////////////Creating item quantity value tab/////////////////////////////
         var createPlus = document.createElement("input");
		 createPlus.setAttribute ("type","button");
		 createPlus.setAttribute("class","quantity");
		 createPlus.setAttribute("id",'val'+data[0]);
		 createPlus.setAttribute("value","1");
		 document.getElementById("idiv"+data[0]).appendChild(createPlus);
        //////////////Creating item quantity + button/////////////////////////////
         var createPlus = document.createElement("input");
		 createPlus.setAttribute ("type","button");
		 createPlus.setAttribute("class","addSub");
		 createPlus.setAttribute("id",data[0]);
		 createPlus.setAttribute("value","+");
		 createPlus.addEventListener("click",function(event){
			                                                  var id=event.target.id;
                                                              var val=document.getElementById('val'+id);
                                                              if(parseInt(val.value)==data[2]);
                                                              else
															  {
																val.value=parseInt(val.value)+1;  
															  }	
                                                              setQuantity(event);
                                                              Total();
                                                              save();															  
														    });
		 document.getElementById("idiv"+data[0]).appendChild(createPlus);
        ////////////Creating Add to cart button///////////////////////////////////
         var createPlus = document.createElement("input");
		 createPlus.setAttribute ("type","button");
		 createPlus.setAttribute("class","addCart");
		 createPlus.setAttribute("id",data[0]);
		 createPlus.setAttribute("value","Add To Cart");
		 createPlus.addEventListener("click",function(event){
			                                                  if(event.target.value=="Add To Cart")
															  {
																addToCart(event,data); 
		                                                        Total();
                                                                save();																
															  }
														    });
		 document.getElementById("idiv"+data[0]).appendChild(createPlus);		
}

/////////////To set quantity in cart/////////////////////////////////////
function setQuantity(event)
{
	var Id=event.target.id;
	var quan=document.getElementById('val'+Id).value;
    var name=document.getElementById('ul'+Id).childNodes[1].innerHTML;
	var price=document.getElementById('ul'+Id).childNodes[2].innerHTML;
	for(var i=0;i<cartCount;i++)
	{
		var cname=document.getElementById('ulc'+i).childNodes[1].innerHTML;
		if(name==cname)
		{
			document.getElementById('ulc'+i).childNodes[2].innerHTML=quan;
			price=parseInt(price)*quan;
			document.getElementById('ulc'+i).childNodes[3].innerHTML='Rs '+price;
			arr[i]=new Object();
            arr[i]={
			               product:[document.getElementById('ulc'+i).childNodes[0].innerHTML,
								    document.getElementById('ulc'+i).childNodes[1].innerHTML,
								    document.getElementById('ulc'+i).childNodes[2].innerHTML,
								    document.getElementById('ulc'+i).childNodes[3].innerHTML]
		           }	
			break;
		}
	}
}

////////////To save new data to local storage//////////////////////////////
function save()
{
		localStorage.setItem(obj.name+"storedCartCount",cartCount);
	    for(var i=0;i<cartCount;i++)
	    {
	     localStorage.setItem(obj.name+"storedCartData"+i,arr[i].product);	
	    }					
}



////////////On clicking add to cart button/////////////////////////////
function addToCart(event,data)
{
      Id=event.target.id;
      var cartDiv=document.getElementById('cartItems');
	  //////////////creating new div////////////////////////////////			
	  var createDiv = document.createElement("div");
	  createDiv.setAttribute("id","cdiv"+cartCount);
	  createDiv.setAttribute("class","itemsList");
	  cartDiv.appendChild(createDiv);
	  /////////////creating a ul in current div///////////////////////
	  var createList = document.createElement("ul");
	  createList.setAttribute("id","ulc"+cartCount);
	  document.getElementById("cdiv"+cartCount).appendChild(createList);
	  /////////////Adding items in li////////////////////////////////////////
	  for(var i=0;i<4;i++)
		{
			var createli = document.createElement("li");
			createli.setAttribute('class',"c4");		 
			if(i==0)
			var textnode = document.createTextNode(parseInt(cartCount)+1);   																 
			else if(i==2)
			var textnode = document.createTextNode(document.getElementById('val'+Id).value);	 
			else if(i==3)
			{
			 var sum=parseInt(data[i])*document.getElementById('val'+Id).value;	
			 var textnode = document.createTextNode('Rs '+sum);	
			}
            else
            var textnode = document.createTextNode(data[i]);  				
			createli.appendChild(textnode);																 
			document.getElementById("ulc"+cartCount).appendChild(createli);																 
		}
	   	////////////Adding item to array//////////////////////////////////////
	    arr[cartCount]=new Object();
        arr[cartCount]={
			               product:[document.getElementById('ulc'+cartCount).childNodes[0].innerHTML,
								    document.getElementById('ulc'+cartCount).childNodes[1].innerHTML,
								    document.getElementById('ulc'+cartCount).childNodes[2].innerHTML,
								    document.getElementById('ulc'+cartCount).childNodes[3].innerHTML]
		               }	
       /////////creating a button to delete item//////////////////////////													
		 var createDel = document.createElement("input");
		 createDel.setAttribute("id","del"+cartCount);
		 createDel.setAttribute ("type","button");
		 createDel.setAttribute("class","delete");
		 createDel.setAttribute("value","X");
		 createDel.addEventListener("click",function(event){
			                                                 Delete(event);
															 Total();
															 save();
														   });
		document.getElementById("cdiv"+cartCount).appendChild(createDel);												   			
		event.target.value="Item Added"; 
		cartCount++;		
}

//////////Code for search button////////////////////////////
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

///////////Code to delete item from cart////////////////////
function Delete(event)
{
	 var Id=event.target.id;
	 Id=Id.substring(3,Id.length);
	  /////////////Changing state of item in list////////////////////////////////
     var cname=document.getElementById('ulc'+Id).childNodes[1].innerHTML;
     for(var i=0;i<count;i++)
	{
		var name=document.getElementById('ul'+i).childNodes[1].innerHTML;
		if(name==cname)
		{
		  document.getElementById('idiv'+i).childNodes[4].value="Add To Cart";
		  document.getElementById('val'+i).value="1";
		}
	}	 
	 ////////updating ids of div/ul/button///////	 
	for(var x=parseInt(Id)+1;x<cartCount;x++)
	{  
	  var y=x-1;	
	  document.getElementById('del'+x).parentElement.id='cdiv'+y;
	  document.getElementById('ulc'+x).childNodes[0].innerHTML=x;
	  document.getElementById('ulc'+x).id='ulc'+y;
	  document.getElementById('del'+x).id='del'+y;//delete button
	}								
     ///////delete item from array////////
	 for(var x=0;x<cartCount;x++)
	 {
	   if(x==Id)
		{
		 while(x!=cartCount-1)
		 { 
	    	arr[x]=arr[x+1];
			arr[x].product[0]=parseInt(arr[x].product[0])-1;
	    	x++;	
		 }  
	    }
	 }	 	
	 ////////////deleting the item from screen//////////////////////////////////
	 event.target.parentElement.parentElement.removeChild(event.target.parentElement);
	 cartCount--;
}

/////////////To calculate total amount///////////////////////////////////////
function Total()
{
	var total=0;
	for(var i=0;i<cartCount;i++)
	{
		var price=document.getElementById('ulc'+i).childNodes[3].innerHTML;
		price=price.substring(3,price.length);
		total=total+parseInt(price);
	}
	document.getElementById('total').innerHTML="Rs "+total;
}

//////////checkout form validation///////////////////////////////////////////
document.getElementById("form").addEventListener("submit",function(event){
	                                                                       var flag=0;
	                                                                       ///////////validating email address///////////////////////
																		   var mail=document.getElementById('mail');
																		   var pass=document.getElementById('pass');
																		   pass.addEventListener("keydown",function(event){ document.getElementById('passerr').innerHTML="";});
												                           mail.addEventListener("keydown",function(event){ document.getElementById('mailerr').innerHTML="";});
												                           if(mail.value.endsWith(".com")==false)
												                           {
													                        flag=1;
                                                                            document.getElementById('mailerr').innerHTML="<br>Invalid email address*<br>";													 
												                           }
												                           else if(mail.value!=obj.email)
												                           {
													                         flag=1;
                                                                             document.getElementById('mailerr').innerHTML="<br>Enter your email address*<br>";	  
												                           }
																		   //////////////validating password///////////////////////////
																		   else if(pass.value!=obj.pass)
																		   {
																			 flag=1;
                                                                             document.getElementById('passerr').innerHTML="<br>Incorrect password*<br>";  
																		   }
																		   ///////////if all info is correct place order////////////////////////////
																		   if(flag==0)
																		   {
																			if(currentId==null)
                                                                            currentId=0;
                                                                            if(placeCount==null)
                                                                            placeCount=0;																				
																			var itemsInCart=[];   
																			for(var i=0;i<cartCount;i++)
                                                                            {
																				itemsInCart[i]=arr[i].product;
																			}	   
																	        var d = new Date();
																			var newObj=new Object;
                                                                            newObj={
																				     Id:currentId,
																					 Status:"inTransit",
																					 Time:d.getHours()+":"+d.getMinutes()+" "+(parseInt(d.getMonth())+1)+"/"+d.getUTCDate()+"/"+d.getUTCFullYear(),
																					 Address:document.getElementById('add').value,
																					 Items:itemsInCart
																			       }
                                                                            var str=JSON.stringify(newObj);
																			localStorage.setItem(obj.name+"order"+placeCount,str);
																			currentId++;
																			placeCount++;
                                                                            localStorage.setItem("currentId",currentId);
                                                                            localStorage.setItem(obj.name+"placeCount",placeCount);	
                                                                            cartCount=0;
                                                                            save();
                                                                            event.preventDefault();
                                                                            window.location.replace("file:///C:/Users/Karans/Desktop/HTML/UCA/Cart/Buyer/index.html"); 																			
																		   }
																		   ////////////else do nothing and give error///////////////////
																		   else
																		   event.preventDefault();
                                                                         });
																		 
function placeOrder(data,i)
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
}																		 

//////////////Loging out of page///////////////////////////////////////////
document.getElementById('logout').addEventListener("click",function(event){
	                                                                        window.location.replace("file:///C:/Users/Karans/Desktop/HTML/UCA/Cart/Login/index.html");
                                                                          });