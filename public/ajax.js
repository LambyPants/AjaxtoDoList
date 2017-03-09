$('#newToDoForm').submit(function(e){
 e.preventDefault();
 var toDoItem = $(this).serialize();
 $.post('/todos', toDoItem, function(data){
  $('#to-do-list').append(
   `
   		<li class="list-group-item">
					<span class="lead">
						${data.text}
					</span>
					<div class="pull-right">
						<a href="/todos/${data._id}/edit" class="btn btn-sm btn-warning">Edit</a>
						<form style="display: inline" method="POST" action="/todos/${data._id}">
							<button type="submit" class="btn btn-sm btn-danger">Delete</button>
						</form>
					</div>
					<div class="clearfix"></div>
				</li>
   `
   )
   $('#newToDoForm').find('.form-control').val('');
 })
})

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