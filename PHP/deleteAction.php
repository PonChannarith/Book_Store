<?php
    $con=new mysqli("localhost","root","","php_learn_1");
    $id=$_POST['ID'];
    $sql="DELETE FROM typebooks WHERE ID=$id";
    $con->query($sql);
?>