var ds = new DataService();

// function to load menu information
function loadItems(items){
    $('#menus').empty();
    console.log(4, "Finished the call");
   
    for(var i=0; i<items.length; i++){
        console.log(items[i]);

        var row = 
        `
        <div class="menudisplay col-md-3" data-id="${items[i].id}">
        <p> ${items[i].id}</p>
        <p style='text-align: center'> ${items[i].name}</p>
        <p style='text-align: center'> ${items[i].price}</p>
        <p style='text-align: center'> Quantity: ${items[i].quantity}</p>
        </div>`
       $('#menus').append(row); 
    
    }



  

}
//function to have selected item in item boc

function showIdInInbox(e) {
    e.preventDefault();
    item = $(this);
    id = item.data('id');
    $('#itemInbox').val(id);	
    }


    //functions to add money
var total = 0;

function addDollar(){
    total+=100;
   totalDisplay = total/100;
    $('#money').val(totalDisplay);
}

function addQuarter(){
    total+=25;
    totalDisplay = total/100;
    $('#money').val(totalDisplay);
}

function addDime(){
    total +=10;
    totalDisplay = total/100;
    $('#money').val(totalDisplay);
}

function addNickel(){
    total +=5;
    totalDisplay = total/100;
    $('#money').val(totalDisplay);
}


//function to vend item
function successVendItem(){

    var amount = $('#money').val();
    var item = $('#itemInbox').val();

        ds.vendItem(id, amount, 
            function sucess(returnMoney) 
                {var change = $('#money');
                  var nickels = returnMoney.nickels;
                 var quarters = returnMoney.quarters;
                var dimes = returnMoney.dimes;
                var returnMessage = "";


            if (quarters != 0 && dimes != 0 || quarters != 0  && nickels != 0 || nickels != 0 && dimes != 0 || quarters != 0 || dimes != 0||nickels != 0 ){

                returnMessage += (((nickels * 5) + (dimes * 10) + (quarters * 25))/100);

            }
            
            if (quarters == 0 && dimes == 0 && nickels == 0) {
                returnMessage += "There is no change";                  
            }
            $('#messageOutput').val("Thank you!!!");
            change.val(returnMessage);                                 
            $('#money').val(returnMessage);
            ds.getItems(loadItems);
            total = 0;
        },
            
            function error(x){
                if(x.status == 442){

                
                }

                $('#messageOutput').val(x.responseJSON.message);

                console.log(x.responseJSON.message);
                $('#money').val('0.00'); 
                })
            }





//function clear message boxes

function clear(){
    $('#money').val('');
    $('#messageOutput').val('');
    $('#returnChange').val('');
    $('#itemInbox').val('');
}


//function to return change
function returnChange() {

    var inputMoney = $('#money').val();
    var money = $('#money').val();

    var quarters = Math.floor(money / 0.25);
    money = (money - quarters * 0.25).toFixed(2);
    var dimes = Math.floor(money / 0.10);
    money = (money - dimes * 0.10).toFixed(2);
    var nickels = Math.floor(money / 0.05);
    money = (money - nickels * 0.05).toFixed(2);
   
    


    var returnMessage = "";
    var vendingMessage = "";

    
    if (quarters == 0 && dimes == 0 && nickels == 0) {
        returnMessage += "There is no change.";   
        vendingMessage = "No money was inputted/left.";   
    } else {
        vendingMessage = "Transaction cancelled. Original input ($" + totalDisplay + ")";
        returnMessage = $('#money').val();

    } 

    $('#messageOutput').val(vendingMessage);
    $('#returnChange').val(returnMessage);

    $('#itemInbox').val('');
    $('#money').val('0.00');  
}

   
$(document).ready(function () {
    
    ds.getItems(loadItems);

    clear();


    //wiring up " Add Dollar" button
    $(document).on('click', '#addDollar',addDollar);

    //wiring up " Add Quarter" button
     $(document).on('click', '#addQuarter', addQuarter);

     //wiring up " Add Dime" button
     $(document).on('click', '#addDime', addDime);

    //wiring up " Add Nickel" button
    $(document).on('click', '#addNickel', addNickel);

    $(document).on('click', '.menudisplay', showIdInInbox);

    // //wiring up "Make Purchase" button
    $(document).on('click', '#makePurchase', successVendItem);

    // //wiring up "Change " button
     $(document).on('click', '#returnChangeb',returnChange);

 
});









