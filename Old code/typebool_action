<?php
$con = new mysqli("localhost","root","","php_learn_1");
    $con->set_charset('utf8');
    $id =$_POST['txt-id'];
    $name =trim($_POST['txt-name']);
    $name=$con->real_escape_string($name);
    $des =trim($_POST['txt-des']);
    // $des=$con->real_escape_string($des);
    $des=str_replace("\n","<b      r>",$des);
    $od=trim($_POST['txt-OD']);
    $img=$_POST['txt-img'];
    $status=$_POST['txt-status'];
    $lang= $_POST['txt-lg'];
    $upd=$_POST['upd'];
    $return['upd']=false;
    $return['dpl']=false;
    $sqldpl="SELECT ID FROM typebooks WHERE Name='$name' AND ID !=$id";
    $resultdpl=$con->query($sqldpl);
    $count=$resultdpl->num_rows;
    if($count==0){
                
            if($upd==0){
                $sql ="INSERT INTO typebooks VALUES(null,'$name','$des',$od,'$img',$status,$lang)";
                $con->query($sql);
                $return['id']=$con->insert_id;
                
            }else{
                $sql= "UPDATE typebooks SET Name='$name',Description='$des',OD=$od,Image='$img',Status=$status,Language=$lang WHERE ID=$id";
                $con->query($sql);
                $return['upd']=true;
            }
    }else{
        $return['dpl']=true;
    }
    echo json_encode($return);
?>