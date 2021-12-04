<?php 
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;
   
   require 'PHPMailer/src/Exception.php';
   require 'PHPMailer/src/PHPMailer.php';

   $mail = new PHPMailer(true);
   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('ru', 'php/language/');
   $mail->IsHTML(true);

   // От кого письмо
   $mail->setFrom('yzebest@gmail.com', 'Данные переданы');
   // Кому отправить
   $mail->addAddress('yurii.kirushov@gmail.com');
   // Тело письма
   $mail->Subject = 'Привет! Пришло новое письмо!';

   // Тело письма
   $body = '<h1>Посетитель передал данные.</h1>';

   if(trim(!empty($_POST['name']))) {
      $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
   }
   if(trim(!empty($_POST['phone']))) {
      $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
   }
   if(trim(!empty($_POST['email']))) {
      $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
   }
   if(trim(!empty($_POST['textarea']))) {
      $body.='<p><strong>Дополнительная информация:</strong> '.$_POST['textarea'].'</p>';
   }

   $mail->Body = $body;

   // Отправление
   if (!$mail->send()) {
      $message = 'Ошибка';
   } else {
      $message = 'Данные отправлены!';
   }

   $response = ['message' => $message]; 

   header('Content-Type: application/json;');
   echo json_encode($response);
?>