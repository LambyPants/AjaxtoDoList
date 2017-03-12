$('#newToDoForm').submit(function(e){
 e.preventDefault();
 var toDoItem = $(this).serialize();
 $.post('/todos', toDoItem, function(data){
  $('#to-do-list').append(
   `
 	<li class="list-group-item">
 <form action="/todos/${data._id}" method="POST" class="edit-item-form">
						<div class="form-group">
			<label for="${data._id}">Item Text</label>
			<input type="text" value="${data.text}" name="todo[text]" class="form-control" id="${data._id}">
			</div>
			<button class="btn btn-primary">Update Item</button>
		</form>
					<span class="lead">
						${data.text}
					</span>
					<div class="pull-right">
						<button class="btn btn-sm btn-warning edit-button" >Edit</button>
						<form style="display: inline" method="POST" action="/todos/${data._id}" class="delete-item-form">
							<button type="submit" class="btn btn-sm btn-danger ">Delete</button>
						</form>
					</div>
					<div class="clearfix"></div>
				</li>
   `
   )
   $('#newToDoForm').find('.form-control').val('');
 })
});


//SHOW Edit form
$('#to-do-list').on('click', '.edit-button', function(){
	$(this).parent().siblings('.edit-item-form').toggle();
});

//PUT Request
$('#to-do-list').on('submit', '.edit-item-form', function(e){
	e.preventDefault();
	var toDoItem = $(this).serialize();
	var actionUrl = $(this).attr('action');
	$originalItem = $(this).parent('.list-group-item');
	$.ajax({
		url: actionUrl,
		data: toDoItem,
		type: 'PUT',
		originalItem: $originalItem,
		success: function(data){
			this.originalItem.html(				`
				
			<form action="/todos/${data._id}" method="POST" class="edit-item-form">
			<div class="form-group">
				<label for="${data._id}">Item Text</label>
				<input type="text" value="${data.text}" name="todo[text]" class="form-control" id="${data._id}">
			</div>
			<button class="btn btn-primary">Update Item</button>
		</form>
					<span class="lead">
						${data.text}
					</span>
					<div class="pull-right">
						<button class="btn btn-sm btn-warning edit-button">Edit</button>
						<form style="display: inline" method="POST" action="/todos/${data._id}" class="delete-item-form">
							<button type="submit" class="btn btn-sm btn-danger">Delete</button>
						</form>
					</div>
					<div class="clearfix"></div>
				
				`
				);
		}
	});
});

				//DELETE item
				$('#to-do-list').on('submit', ".delete-item-form", function(e){ 
					e.preventDefault();
					var confirmResponse = confirm("Are you sure you want to delete this item?");
					if(confirmResponse){ 
						var actionUrl = $(this).attr('action');
						var itemToDelete = $(this).closest('.list-group-item');
						$.ajax({
							url: actionUrl,
							type: 'DELETE',
							itemToDelete: $(itemToDelete),
							success: function(data){
								this.itemToDelete.fadeOut(500, function(){
									remove();
								})
							}							
						})
						
					} else {
					$(this).find('button').blur();
						
					}
					
				});
				
// 				$("ul").on("click", "span", function(event){
//   $(this).parent().fadeOut(500, function(){
//     $(this).remove();
//   });
//   event.stopPropagation();
// });


//NOTES:


// $.get('/todos', function(data){
//  console.log(data);
 
// });

// $('form').submit(function(e){
//  e.preventDefault();
//  var formData = $(this).serialize();
//  $.post('/todos', formData, function(data){
//   console.log(data);
//  })
// });

// $('form').submit(function(e){
//  e.preventDefault();
//  var formData = $(this).serialize();
//  var formAction = $(this).attr('action');
//  $.ajax({ 
//   url: formAction,
//   data: formData,
//   type: 'PUT',
//   success: function(data){ 
//    console.log(data);
//   }
//   })
//  });


// $('form').submit(function(e){
//  e.preventDefault();
//  var formAction = $(this).attr('action');
//  $.ajax({ 
//   url: formAction,
//   type: 'DELETE',
//   success: function(data){ 
//    debugger
//   }
//   })
//  });