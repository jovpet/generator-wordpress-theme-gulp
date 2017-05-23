<?php
include('../../../wp-load.php');

$param = $_POST;
/**
 * $_POST variables need to be sent in order to send email
 * email
 * name
 * surname
 * subject
 * message
 **/
require '../../../vendor/autoload.php';

$mail = new PHPMailer;
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

$mail->CharSet = 'UTF-8';
$mail->isSMTP();                                                // Set mailer to use SMTP
$mail->Host = get_theme_mod('smtp_host', true);                 // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                                         // Enable SMTP authentication
$mail->Username = get_theme_mod('smtp_username', true);         // SMTP username info@miro-kredit.ch
$mail->Password = get_theme_mod('smtp_password', true);         // SMTP password
$mail->SMTPSecure = get_theme_mod('smtp_secure', true);         // Enable TLS encryption, `ssl` also accepted
$mail->Port = get_theme_mod('smtp_port', true);                 // TCP port to connect to //25

$mail->addAddress( get_theme_mod('smtp_contact_mail', true) );
//$mail->addCC('me@localhost');

$mail->isHTML(true);                                            // Set email format to HTML

$mail->SetFrom(get_theme_mod('smtp_from_email', true));
$mail->AddReplyTo($_POST['email'], $_POST['name'].' '.$_POST['surname']);

$formatFrom = __('Contact from %s', '<%= name %>');

$message = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style media="screen">
body {margin: 15px; padding: 0; font-family: Arial, Helvetica, sans-serif;}
p {margin: 0 0 10pt 0; padding: 0; font-size: 10pt; color: #000; }
</style>
</head>
<body>
<h3 style="color:#000;font-size:14px;font-weight:bold;margin:1em 0 0.5em;padding:0;border-bottom:1px solid #000;">'.__('Contact from: ', '<%= name %>').'</h3>';
$message .= '<p>'.__('Name and Surname', '<%= name %>').': '.$_POST['name'].' '.$_POST['surname'].'</p>
    <p>'.__('Email', '<%= name %>').': '.$_POST['email'].'</p>';
$message .= '<hr style="border: 0; height: 0; border-bottom: 1px solid #000;">';
$message .= '<p>'.__('Message', '<%= name %>').': '.$_POST['message'].'</p>';
$message .= '</body>
</html>';

$mail->Subject = sprintf($formatFrom, '<%= website %>').': '.$_POST['subject'];
$mail->Body    = $message;
$mail->AltBody = $message;

if(!$mail->send()) {
    echo 'error<div class="alert callout" data-closable="slide-out-right">
            <p>'.__('Sending Failed. Please try again later on. Thank You.', '<%= name %>').'</p>
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>';
} else {
    echo '<div class="success callout" data-closable="slide-out-right">
            <p>'.__('The message has been successfully sent. We\'ll replay as soon as possible. Thank You.', '<%= name %>').'</p>
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>';
} ?>