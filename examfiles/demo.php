<?php
require_once('./../db.php');
if (isset($_GET['submit'])) {
  if ($_GET['sname'] && $_GET['smark']) {
    $sname = $_GET['sname'];
    $smark = $_GET['smark'];
    $data = mysqli_query($con, "INSERT INTO ar(name,mark) VALUES('$sname' , '$smark')");
  }
  // header("Location: test.php");
}
?>
<!DOCTYPE html>
<html lang="en" dir="rtl">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الشاعر والفقر</title>
  <!-- CSS file -->
  <link rel="stylesheet" href="./../../CSS/main.css">
  <!-- Awesome Fonts File -->
  <link rel="stylesheet" href="./../../CSS/all.min.css">
</head>

<body class="special">
  <img src="./../../imgs/logo.png" alt="logo">
  <!-- Start Header -->
  <header class="exam-header">
    <nav class="test info">
      <span>المادة : اللغة العربية</span>
      <span>العام الدراسي : <span style="display: inline-block;">2024 - 2023</span></span>
    </nav>
    <nav class="center">
      <div class="logo">
        <img src="./../../imgs/logo.png" alt="logo">
      </div>
      <span>معهد سراج التعليمي</span>
      <span>للشهادتين الإعدادية والثانوية</span>
    </nav>
    <nav class="test info">
      <span>الصف : الثالث الثانوي العلمي</span>
      <span>المدرس : منير</span>
    </nav>
  </header>
  <!-- End Header -->
  <div class="demo-data">
    <div class="container">
      <div class="box">
        <div class="info">
          <i class="fa-regular fa-circle-check"></i>
          <p>النتيحة : <span dir="ltr" id="res"></span></p>
          <p>سيتم عرض سلم التصحيح فور انتهاء وقت الاختبار المحدد</p>
          <p>نتمنى لكم دوام التفوق والنجاح</p>
        </div>
        <a href="./../../index.html">الصفحة الرئيسة</a>
      </div>
    </div>
  </div>
  <script>
    let examKey = "ar";
    if (window.localStorage.getItem(`${examKey}-sMark`)) {
      document.querySelector('#res').innerHTML = window.localStorage.getItem(`${examKey}-sMark`);
    } else {
      document.querySelector('#res').innerHTML = 0;
    }
  </script>
</body>

</html>