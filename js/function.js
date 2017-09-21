
$( document ).ready(function() {
	   var mainId = 0; 
		productDetails(mainId);
         $(document).on('click', '#addBtn', function(){
         	addNewProduct();
         });
		var back =$(".product");
		var	next = $(".contact");
		var	steps = $(".step");
		$('#billing').hide(); 
		next.bind("click", function() {
			$('#selectProduct').hide();
			$('#billing').show(); 
			$.each( steps, function( i ) {
				if (!$(steps[i]).hasClass('current') && !$(steps[i]).hasClass('done')) {
					$(steps[i]).addClass('current');
					$(steps[i - 1]).removeClass('current').addClass('done');
					return false;
				}
			})		
		});
		back.bind("click", function() { 
			$('#selectProduct').show();
			$('#billing').hide(); 
			$.each( steps, function( i ) {
				if ($(steps[i]).hasClass('done') && $(steps[i + 1]).hasClass('current')) {
					$(steps[i + 1]).removeClass('current');
					$(steps[i]).removeClass('done').addClass('current');
					return false;
				}
			})		
		});


        	 $(document).on('click','.deleteData',function(){
        	 	var parents = $(this).parent().parent().attr('id');
        	 	$('#'+parents).empty();
        	 	updatedPrice();
        	 }); 

	});
var increment = 1;
function addNewProduct(){
 var numericCircle = parseInt(increment+1);
 var appendNewProduct = '<div id="mainContent'+increment+'"><div class="nav clearfix">	</div>		<div class="col-md-4"><label class="numberCircle">'+numericCircle+'</label><label> Select your product </label> </div>		<div class="col-md-4"><label>Quantity</label></div>		<div class="col-md-4"><label>Price</label></div>	<div class="nav clearfix"></div>        <div class="col-md-4 col-sm-2"> Product</div>        <div class="col-md-4 col-sm-2">        	  <input type="number" name="quantity" min="0" class="quantityClass form-control" id="quantity'+increment+'">        </div>        <div class="col-md-4 col-sm-2">        	<span class="priceClass" id="price'+increment+'">$0.</span>        	<button type="button" class="btn btn-danger pull-right deleteData">Delete</button>        </div>                <div class="nav clearfix"></div>        <div class="col-md-4 col-sm-2 form-group">		    <select name="product" class="productData form-control" id="product'+increment+'" >		      <option>Select</option>		    </select>		</div>	<div class="nav clearfix"></div> 	<div class="col-md-4 col-sm-2">Deployement option</div> 	 <div class="nav clearfix"></div>       <div class="col-md-4 col-sm-2 form-group">	    <select name="deployment" class="deploymentData form-control" id="deployement'+increment+'">	      <option>Select</option>	    </select>	</div>	  <div class="nav clearfix"></div>        <div class="col-md-4 col-sm-2"> Model</div>        <div class="nav clearfix"></div>        <div class="col-md-4 col-sm-2 form-group">	    <select name="model" class="modelData form-control" id="model'+increment+'">	      <option>Select</option>	    </select>	</div>	<div class="nav clearfix"></div>	<div class="dotted"></div></div>';
  	$('.additionalContent').append(appendNewProduct);
  	var mainId = increment;
  	productDetails(mainId);
  	increment++;

  }

function productDetails(mainId){
       readTextFile('js/purchase_form_data.json', function(result) {
               		var data = JSON.parse(result);
               		var optionValues =[];
               		var originalPrice;
               
               		var mainQuantityId = "#quantity"+mainId;
               		var mainPriceId = "#price"+mainId;		
               		var mainProductId = "#product"+mainId;
               		var mainDeployementId = "#deployement"+mainId;
               		var mainModelId = "#model"+mainId;

               		var products = data.products;
               		var deployment_methods = data.deployment_methods;

               		// Product combo box
                   	$.each(products, function(i, field){
    					 $(mainProductId ).append($("<option></option>")
						               .attr("value",field.product_id)
						               .text(field.product_name));
    				});
              // Deployement combo box
                $(document).on('change', mainProductId , function(){ 
        			var product_id = $(this).val();
        			optionValues =[];
        			$(mainDeployementId ).empty();
        			$(mainDeployementId ).append($('<option>Select</option>'));
        			 $.each(products,function(products_key,products_element){ 
								  if(product_id == products_element.product_id){
								  	 var product_models = products_element.product_models;
			    					 $.each(product_models, function(models_key, models_element) {		 	
										 $.each(deployment_methods,function(deployement_key,deployement_element){

											  if(deployement_element.deployment_id == models_element.deployment_id ){

											  	if($.inArray(deployement_element.deployment_id, optionValues) >-1){
											  		 }else{

												      optionValues.push(deployement_element.deployment_id);
												      $(mainDeployementId ).append($("<option></option>")
									               .attr("value",deployement_element.deployment_id)
									               .text(deployement_element.deployment_name));
												   }
													
											 	}
											  });
									});

							}
        		});

       // Model box 
        	 $(document).on('change', mainDeployementId , function(){ 
        	 		$(mainModelId).empty();
        	 		var product_id = $(mainProductId ).val();
        	 		var deployement_id = $(this).val();
        	 		$(mainModelId).append($('<option>Select</option>'));
        	 		 $.each(products,function(products_key,products_element){ 
								  if(product_id == products_element.product_id){
								  	 var product_models = products_element.product_models;
			    					 $.each(product_models, function(models_key, models_element) {		 	
											  if(deployement_id == models_element.deployment_id ){
											  	 $(mainModelId).append($("<option></option>")
									               .attr("value",models_element.model_id)
									               .text(models_element.model_name));
											  }
											});
			    					}
			    				}); 

        	 });	

        	  $(document).on('change',mainModelId, function(){ 	
        	  	var product_id = $(mainProductId).val();
        	 	var deployement_id = $(mainDeployementId).val();
        	 	var model_id =  $(this).val();
        	 	 $(mainQuantityId).val('1');
        	 	 $.each(products,function(products_key,products_element){ 
								  if(product_id == products_element.product_id){
								  	 var product_models = products_element.product_models;
			    					 $.each(product_models, function(models_key, models_element) {		 	
											  if(deployement_id == models_element.deployment_id && 
											  	model_id == models_element.model_id){
											  	$(mainPriceId ).text('$'+models_element.model_price);
											  	originalPrice = models_element.model_price;
											  	updatedPrice();
											  }
											});
			    					}
			    				});
                   
        	});
        	    $(document).on('change', mainQuantityId, function(){
        	    	var quantity =  $(this).val();
        	    	var updated_price = quantity*originalPrice;
        	    	$(mainPriceId).html('$'+updated_price);
        	    	updatedPrice();



        	    });
  

         });
      });
}	

function updatedPrice(){
	var priceInputs = $(".priceClass");
	var finalPrice = 0;
	for(var i = 0; i < priceInputs.length; i++){
	    finalPrice =  parseInt($(priceInputs[i]).html().replace('$', ''))+finalPrice;
	}
	$('#finalPrice').html('$'+finalPrice);
		
}
function readTextFile(file, callback) {
		    var rawFile = new XMLHttpRequest();
		    rawFile.overrideMimeType("application/json");
		    rawFile.open("GET", file, true);
		    rawFile.onreadystatechange = function() {
		        if (rawFile.readyState === 4 && rawFile.status == "200") {
		            callback(rawFile.responseText);
		        }
		    }
		    rawFile.send(null);
		} 