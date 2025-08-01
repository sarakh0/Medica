<?php

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader (created by composer, not included with PHPMailer)
require __DIR__ . '/../vendor/autoload.php';

// Load .env variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../'); // Adjust path if needed
$dotenv->load();

// Validate POST request
if ($_SERVER["REQUEST_METHOD"]=="POST"){
    $formType = $_POST['form_type'] ?? ''; // get form type from hidden element in HTML, otherwise empty

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

    // Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings, SMPT setup
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = $_ENV['MAIL_HOST'];                     //Try Gmail for testing ?????
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = $_ENV['MAIL_USERNAME'];                 //SMTP username
        $mail->Password   = $_ENV['MAIL_PASSWORD'];                 //SMTP password
        $mail->SMTPSecure = $_ENV['MAIL_ENCRYPTION'];               //Enable implicit TLS encryption
        $mail->Port       = $_ENV['MAIL_PORT'];                     //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        // Recipients
        $mail->addAddress($_ENV['MAIL_TO']);            
    
        $mail->isHTML(true);

        switch ($formType) {
            case 'transfer':
                $firstname = $_POST['firstname'] ?? '';
                $lastname = $_POST['lastname'] ?? '';
                $phone = $_POST['phonenumber'] ?? '';
                $dob = $_POST['dob'] ?? '';
                $pharmName = $_POST['pharmName'] ?? '';                
                $currentNum = $_POST['currentNum'] ?? '';
                $message = $_POST['message'] ?? '';

                $mail->Subject = "New Transfer Request from $firstname $lastname";
                $mail->Body = "
                    <p><strong>First Name:</strong> $firstname</p>
                    <p><strong>Last Name:</strong> $lastname</p>
                    <p><strong>Phone Number:</strong> $phone</p>
                    <p><strong>Date of Birth:</strong> $dob</p>
                    <p><strong>Current Pharmacy Name:</strong> $pharmName</p>
                    <p><strong>Current Pharmacy Phone:</strong> $currentNum</p>
                    <p><strong>Comments:</strong> " . nl2br($message) . "</p>
                    <hr>
                    <p>Submitted via the Transfer Form on the Medica Pharmacy website.</p>";
                break;

            case 'refill':
                $firstname = $_POST['firstname'] ?? '';
                $lastname = $_POST['lastname'] ?? '';
                $phone = $_POST['phonenumber'] ?? '';
                $rxnumber = $_POST['rxnumber'] ?? '';
                $rxname = $_POST['rxname'] ?? '';
                $message = $_POST['message'] ?? '';

                $mail->Subject = "New Refill Request from $firstname $lastname";
                $mail->Body = "
                    <p><strong>First Name:</strong> $firstname</p>
                    <p><strong>Last Name:</strong> $lastname</p>
                    <p><strong>Phone Number:</strong> $phone</p>
                    <p><strong>Rx Number:</strong> $rxnumber</p>
                    <p><strong>Rx Name:</strong> $rxname</p>
                    <p><strong>Comments:</strong> " . nl2br($message) . "</p>
                    <hr>
                    <p>Submitted via the Refill Form on the Medica Pharmacy website.</p>";
                break;

            default:
                exit("Invalid form type.");
        }     

        // Send email
        $mail->send();
        echo 'Message has been sent succesfully.';

    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

?>