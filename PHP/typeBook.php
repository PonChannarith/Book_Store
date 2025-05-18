<?php
    $con= new mysqli("localhost","root","","php_learn_1");
    $sql="SELECT ID FROM typebooks ORDER BY ID DESC";
    $result=$con->query($sql);
    $count =$result->num_rows;
    if($count==0){
        $getAutoID=1;
    }else{
        $col =$result->fetch_array();
        $getAutoID=$col[0]+1;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initialZS-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="../JS/JQuery.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="../CSS/typeBook.css">
    <title>Type Book store</title>
</head>
<body>
    <form action="" class="form-data">
        <input type="text" name="upd" id="upd" value="0">
        <label for="id">ID(Type of Book)</label><br>
        <input type="text" name="txt-id" id="id" value="<?php echo $getAutoID ?>" class="form-control" placeholder="Enter your ID"><br>
        <label for="name">Name</label><br>
        <input type="text" name="txt-name" id="name"  class="form-control" placeholder="Enter your name"><br>
        <label for="des">Type Book Descripton</label><br>
        <textarea name="txt-des" id="des" cols="30" rows="7"  class="form-control" placeholder="Enter your description"></textarea><br>
        <label for="OD">OD</label><br>
        <input type="text" name="txt-OD" id="OD" value="<?php echo $getAutoID ?>"  class="form-control" placeholder="Enter your OD"><br>
        <label for="img">Upload photo</label><br>
        <div class="photo"><br>
            <input type="file" name="tfile" id="img"><br>
        </div><br>
        <input type="text" name="txt-img" id="txt-img">
            <label for="Status">Status (1=show ,0=hide)</label><br>
            <select name="txt-status" id="status" class="form-control"><br>
                <option value="1">1</option>
                <option value="0">0</option>
            </select><br>
            <label for="lg">language(1=khmer,2=English)</label><br>
            <select name="txt-lg" id="lg" class="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
            </select><br><br>
            <input type="button" value="Save"  class="btn btn-primary btn-save" style="width:70px">
    </form>
    <div class="container-fluid">
        <table class="table table-bordered table-hover tbl-data">
            <tr class="trth">
                <th width="60px">ID</th>
                <th width="170px">Name</th>
                <th>Description</th>
                <th width="60px">OD</th>
                <th width="80px">Photo</th>
                <th width="100px">Status</th>
                <th width="110px">language</th>
                <th width="180px">Action</th>
            </tr>   
            <?php
                $sql="SELECT * FROM typebooks ORDER BY ID DESC";
                $result=$con->query($sql);
                while($col=$result->fetch_array()){
                    ?>
                        <tr>
                        <td><?php echo $col[0] ?></td>
                        <td><?php echo $col[1] ?></td>
                        <td><?php echo $col[2] ?></td>
                        <td><?php echo $col[3] ?></td>
                        <td>
                            <img src="../Move_Image/<?php echo $col[4] ?>" alt="<?php echo $col[4] ?>">
                        </td>
                        <td><?php echo $col[5] ?></td>
                        <td><?php echo $col[6] ?></td>
                        <td>
                            <span class="btn btn-primary edit">Edit</span>
                            <span class="btn btn-danger del">Delete</span>
                                <div class="boxdel">
                                    <h4>Are you sure to delete it?</h4>
                                    <span class="btn btn-danger yes">Yes</span>
                                    <span class="btn btn-primary no">No</span>
                                </div>
                                <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                        </td>
                    </tr>
                    <?php
                }
            ?>
        </table>
    </div>

</body>
<script src="../JS/typeBook.js"></script>
</html>