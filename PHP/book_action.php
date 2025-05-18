<?php
$con = new mysqli("localhost","root","","php_learn_1");
    $con->set_charset('utf8');
    $id =$_POST['txt-id'];
    $name =trim($_POST['txt-name']);
    $name=$con->real_escape_string($name);
    $typebook=$_POST['txt-typebook'];
    $des =trim($_POST['txt-des']);
    // $des=$con->real_escape_string($des);
    $des=str_replace("\n","<br>",$des);
    $od=trim($_POST['txt-OD']);
    $img=$_POST['txt-img'];
    $status=$_POST['txt-status'];
    $lang= $_POST['txt-lg'];
    $upd=$_POST['upd'];
    $return['upd']=false;
                
            if($upd==0){
                $sql ="INSERT INTO book VALUES(null,'$name',$typebook,'$des',$od,'$img',$status,$lang)";
                $con->query($sql);
                $return['id']=$con->insert_id;
                
            }else{
                $sql= "UPDATE book SET Name='$name',TypebookID=$typebook,Description='$des',OD=$od,Image='$img',Status=$status,Language=$lang WHERE ID=$id";
                $con->query($sql);
                $return['upd']=true;
            }
            echo json_encode($return);
?>