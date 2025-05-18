$(document).ready(function(){
    //save data
    const body=$('body');
    const popup='<div class="popup"></div>';
    const loading=' <div class="loading"></div>';
    var trIndex;
    // body.append(popup);
    // body.find('.popup').append(loading);
    //Save data
    $('.btn-save').click(function(){
        // alert("I love u")
            var name=$('#name');
            var des=$('#des');
            var od=$('#OD');
            var img=$('#txt-img');
            var typebook=$('#typebook');
            if(name.val()==''){
                alert("Please input name");
                name.focus();
                return;
            }
            if(des.val()==''){
                alert("Please input description");
                des.focus();
                return;
            }
            if(od.val()==''){
                alert("Please input od");
                od.focus();
                return;
            }
            if(img.val()==''){
                alert("Please choose photo");

                return;
            }
            if(typebook.val()==0){
                alert("Please choose type of book");
                return;
            }
            var eThis=$(this);
            var frm = eThis.closest('form.form-data');
            var frm_data = new FormData(frm[0]);
            $.ajax({
                url:'book_action.php',
                type:'POST',
                data:frm_data,
                contentType:false,
                cache:false,
                processData:false,
                dataType:"json",
                beforeSend:function(){
                    //work before scucces
                    // body.append(popup);
                    // body.find('.popup').append(loading);
                },
                success:function(data){
                    //work after success
                    // alert("Hello")
                    // if(data['dpl']==true){
                    //     alert("Duplicate name");
                    //     body.find('.popup').remove();
                    //     return;
                    // }
                    if(data['upd']==true){
                        // alert("Update");
                        // alert(trIndex)
                        $('.tbl-data').find('tr:eq('+trIndex+')').find('td:eq(1)').text($('#name').val());
                        $('.tbl-data').find('tr:eq('+trIndex+')').find('td:eq(2)').text($('#des').val());
                        $('.tbl-data').find('tr:eq('+trIndex+')').find('td:eq(3)').text($('#OD').val());
                        $('.tbl-data').find('tr:eq('+trIndex+')').find('td:eq(4) img').attr('src',"../Move_Image/"+$('#txt-img').val());
                        $('.tbl-data').find('tr:eq('+trIndex+')').find('td:eq(4) img').attr('alt',$('#txt-img').val());
                        $('.tbl-data').find('tr:eq('+trIndex+')').find('td:eq(5)').text($('#status').val());
                        $('.tbl-data').find('tr:eq('+trIndex+')').find('td:eq(6)').text($('#lg').val());
                        $('#id').val(parseInt($('.tbl-data').find('tr:eq(1)').find('td:q(0)').text()));
                        $('#OD').val(parseInt($('.tbl-data').find('tr:eq(1)').find('td:q(0)').text()));
                        
                    }else{
                                var tr=`
                                <tr>
                                    <td>${$('#id').val()}</td>
                                    <td>${$('#name').val()}</td>
                                    <td>${$('#typebook').val()}</td>
                                    <td>${$('#des').val()}</td>
                                    <td>${$('#OD').val()}</td>
                                    <td>
                                        <img src="../Move_Image/${$('#txt-img').val()}" alt="${$('#txt-img').val()}">
                                    </td>
                                    <td>${$('#status').val()}</td>
                                    <td>${$('#lg').val()}</td>
                                    <td>
                                        <span class="btn btn-primary edit">Edit</span>
                                        </td>
                                </tr> 
                            `;
                            $('.tbl-data').find('.trth').after(tr);
                            $('#id').val(data['id']+1);
                            $('#OD').val(data['OD']+1);
                        }

                $('#name').val("");
                $('#des').val("");           
                $('#status').val(1);
                $('#lg').val(1);  
                $('#txt-img').val('');
                $('.photo').css({"background-image":"url(../Image/Placeholder.webp)"});
                body.find('.popup').remove();
                }
			
            }); 
    });
    //Move_Image
    $('#img').change(function(){
        var eThis=$(this);
        var frm = eThis.closest('form.form-data');
            var frm_data = new FormData(frm[0]);
            $.ajax({
                url:'moveImage_action.php',
                type:'POST',
                data:frm_data,
                contentType:false,
                cache:false,
                processData:false,
                dataType:"json",
                beforeSend:function(){
                        //work before success
                        // body.append(popup);
                        // body.find('.popup').append(loading);
                },
                success:function(data){   
                        //work after success   
                    $('#txt-img').val(data['img']);
                    $('.photo').css({"background-image":"url(../Move_Image/"+data['img']+")"}) 
                }				
            });
    });
    //Edit
    $('.tbl-data').on("click",".edit",function(){
        var tr=$(this).parents('tr');
        trIndex=tr.index();
        $('#upd').val(trIndex);
        // var trIndex=tr.index();
        var eid=tr.find('td:eq(0)').text();
        var ename=tr.find('td:eq(1)').text().trim();
        var edes=tr.find('td:eq(2)').text().trim();
        var eod=tr.find('td:eq(3)').text().trim();
        var eimg=tr.find('td:eq(4) img').attr('alt');
        var estatus=tr.find('td:eq(5)').text();
        var elang=tr.find('td:eq(6)').text();
        $('#id').val(eid);
        $('#name').val(ename);
        $('#des').val(edes);
        $('#OD').val(eod);
        $('#status').val(estatus);
        $('#lg').val(elang);
        $('#txt-img').val(eimg);
        $('.photo').css({"background-image":`url(../Move_Image/${eimg})`});
    });
    //Delete
    
    $('.tbl-data').on("click",".del",function(){
        var tr=$(this).parents('tr');
        trIndex=tr.index();
        $(this).parent().find('.boxdel').slideDown(100);
        $(this).parent().find('i').slideDown(50);
    });
    $('.tbl-data').on("click",".no",function(){
        $(this).parent().slideUp(100);
        $(this).parents('td').find('i').hide(50);
    });
    $('.tbl-data').on("click",".yes",function(){
        $(this).parent().slideUp(100);
        $(this).parents('td').find('i').hide(50);
        var id =$(this).parents('tr').find('td:eq(0)').text();
        // alert(id);
        $.ajax({
            url:'deleteAction.php',
            type:'POST',
            data:{ID:id},
            // contentType:false,
            cache:false,
            // processData:false,
            // dataType:"json",

            beforeSend:function(){
                    // work before success
                    body.append(popup);
                    body.find('.popup').append(loading);
                
            },
            success:function(data){   
                    //work after success   
                // $('#txt-img').val(data['img']);
                // $('.photo').css({"background-image":"url(../Move_Image/"+data['img']+")"}) 
                body.find('.popup').remove();
                $('.tbl-data').find('tr:eq('+trIndex+')').remove();
            }				
        });
        
    })
    


})
