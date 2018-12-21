$(document).ready(function(){
    $("#submitForm").click(function(){
        if (checkData()){
            var img="";
            base64( $('input[type="file"]'), function(data){
                img = data.base64;
                
        
                let req_data ={
                    "category" : $("#category").val(),
                    "name"  : $("#name").val(),
                    "price" : $("#price").val(),
                    "description" : $("#description").val(),
                    "image" : img,
                }
            // let req_data= new FormData();
            // req_data.append("ca")
            

                $.ajax({
                    type :"post",
                    url : "/upload",
                    dataType : false,
                    contentType : "application/json",
                    cache : false,
                    data : req_data,
                    processData:false,
                    beforeSend: function(){
                        alert("Upload");
                    },
                    // success : function(data){
                    //     alert("upload success");
                    //     // $.parseJSON(data);
                    // }

                })
            
            })
        
        };
    });

    function checkData(){
        return true;
    }
    function base64(file, callback){
        var coolFile = {};
        function readerOnload(e){
          var base64 = btoa(e.target.result);
          coolFile.base64 = base64;
          callback(coolFile)
        };
      
        var reader = new FileReader();
        reader.onload = readerOnload;
      
        var file = file[0].files[0];
        coolFile.filetype = file.type;
        coolFile.size = file.size;
        coolFile.filename = file.name;
        reader.readAsBinaryString(file);
      }

    
});