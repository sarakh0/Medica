<?php

    ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader (created by composer, not included with PHPMailer)
require __DIR__ . '/../vendor/autoload.php';

// Load .env variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../'); // Adjust path if needed
$dotenv->load();


if ($_SERVER["REQUEST_METHOD"]=="POST"){
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    // reCAPTCHA validation
    $recaptchaSecret = $_ENV['RECAPTCHA_SECRET'];
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

    if (!$recaptchaResponse) {
        exit('Please verify that you are not a robot.');
    }

    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaResponse}");
    $responseData = json_decode($verify);

    if (!$responseData->success) {
        exit('reCAPTCHA verification failed. Please try again.');
    }

    //add validaiton here????????????????????????????????????????????????????????????????????

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = $_ENV['MAIL_HOST'];                     //Try Gmail for testing ?????
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = $_ENV['MAIL_USERNAME'];                     //SMTP username
        $mail->Password   = $_ENV['MAIL_PASSWORD'];                               //SMTP password
        $mail->SMTPSecure = $_ENV['MAIL_ENCRYPTION'];            //Enable implicit TLS encryption
        $mail->Port       = $_ENV['MAIL_PORT'];                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress($_ENV['MAIL_TO']);            
        $mail->addReplyTo($email, $name);

        if (!empty($_FILES['attachment']['tmp_name'])) {
            $mail->addAttachment($_FILES['attachment']['tmp_name'], $_FILES['attachment']['name']);  // need it to be abel to upload more than one file
        }

        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission: ' . htmlspecialchars($subject);
        // body of the email
        $mail->Body =  "        
            <p><strong>Name:</strong> " . $name. "</p>
            <p><strong>Email:</strong> " . $email . "</p>
            <p><strong>Subject:</strong> " . $subject . "</p>
            <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
            <hr>
            <p>This message was sent via the contact form on the medica pharmacy website.</p>
        ";

        $mail->AltBody = 
            "New Contact Form Submission\n\n" .
            "Name: $name\n" .
            "Email: $email\n" .
            "Subject: $subject\n" .
            "Message:\n$message\n\n" .
            "This message was sent via the contact form on the medica pharmacy website.";

        $mail->send();
        echo 'Message has been sent';

    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

?>