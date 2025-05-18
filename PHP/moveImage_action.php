<?php
    $image=$_FILES['tfile'];
    $type_img=pathinfo( $image['name'],PATHINFO_EXTENSION);
    $img_name=rand(0000,9999).time().".".$type_img;
    $tmp_name=$image['tmp_name'];
    move_uploaded_file($tmp_name,"../Move_Image/".$img_name);
    $return['img']=$img_name;
    echo json_encode($return);
?>