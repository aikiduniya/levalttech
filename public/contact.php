<?php
// Levalt.tech contact form handler — for shared hosting (Hostinger etc.)
// Uses PHP's mail() with SMTP via fsockopen (no Composer / PHPMailer needed).

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// ===== SMTP CONFIG =====
$SMTP_HOST = 'smtp.hostinger.com';
$SMTP_PORT = 465;
$SMTP_USER = 'support@levalt.tech';
$SMTP_PASS = 'Haroonraja44@';     // <-- hosting pe sahi password rakhein
$ADMIN_TO  = 'support@levalt.tech';
$FROM_NAME = 'Levalt.tech Website';

// ===== Input =====
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$company = trim($_POST['company'] ?? '');
$service = trim($_POST['service'] ?? 'General');
$message = trim($_POST['message'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid input']);
    exit;
}
if (strlen($name) > 100 || strlen($email) > 255 || strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Input too long']);
    exit;
}

function esc($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

$safe = [
    'name'    => esc($name),
    'email'   => esc($email),
    'company' => esc($company !== '' ? $company : '—'),
    'service' => esc($service !== '' ? $service : '—'),
    'message' => nl2br(esc($message)),
];

$adminHtml = '
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fff;color:#111;">
  <h2 style="color:#5b3df5;margin:0 0 16px;">New contact enquiry — Levalt.tech</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:8px 0;color:#666;width:120px;">Name</td><td><strong>'.$safe['name'].'</strong></td></tr>
    <tr><td style="padding:8px 0;color:#666;">Email</td><td><a href="mailto:'.$safe['email'].'">'.$safe['email'].'</a></td></tr>
    <tr><td style="padding:8px 0;color:#666;">Company</td><td>'.$safe['company'].'</td></tr>
    <tr><td style="padding:8px 0;color:#666;">Service</td><td>'.$safe['service'].'</td></tr>
  </table>
  <h3 style="margin:24px 0 8px;font-size:15px;">Message</h3>
  <div style="padding:16px;background:#f6f6fb;border-radius:8px;font-size:14px;line-height:1.6;">'.$safe['message'].'</div>
  <p style="margin-top:24px;font-size:12px;color:#999;">Sent from levalt.tech contact form</p>
</div>';

$replyHtml = '
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fff;color:#111;">
  <h2 style="color:#5b3df5;margin:0 0 12px;">Thanks for reaching out, '.$safe['name'].'!</h2>
  <p style="font-size:14px;line-height:1.6;color:#333;">
    We have received your message and a member of the Levalt.tech team will get back to you within one business day.
  </p>
  <p style="font-size:14px;line-height:1.6;color:#333;">Here is a copy of what you sent us:</p>
  <div style="padding:16px;background:#f6f6fb;border-radius:8px;font-size:14px;line-height:1.6;color:#444;">
    <strong>Service:</strong> '.$safe['service'].'<br/><br/>'.$safe['message'].'
  </div>
  <p style="font-size:14px;line-height:1.6;color:#333;margin-top:20px;">
    In the meantime, feel free to explore our <a href="https://levalt.tech/services" style="color:#5b3df5;">services</a>
    or the <a href="https://levalt.tech/faq" style="color:#5b3df5;">FAQ</a>.
  </p>
  <p style="font-size:14px;line-height:1.6;margin-top:24px;">— The Levalt.tech Team</p>
  <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
  <p style="font-size:12px;color:#999;">Levalt.tech · support@levalt.tech</p>
</div>';

// ===== Tiny SMTP client (SSL on port 465) =====
function smtp_send($host, $port, $user, $pass, $fromName, $fromEmail, $to, $subject, $html, $replyTo = null) {
    $remote = ($port == 465 ? 'ssl://' : '') . $host . ':' . $port;
    $errno = 0; $errstr = '';
    $fp = @stream_socket_client($remote, $errno, $errstr, 20);
    if (!$fp) throw new Exception("SMTP connect failed: $errstr ($errno)");
    stream_set_timeout($fp, 20);

    $expect = function($code) use ($fp) {
        $resp = '';
        while (!feof($fp)) {
            $line = fgets($fp, 515);
            if ($line === false) break;
            $resp .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        if (strpos($resp, (string)$code) !== 0) {
            throw new Exception("SMTP error: $resp");
        }
        return $resp;
    };
    $send = function($cmd) use ($fp) { fwrite($fp, $cmd . "\r\n"); };

    $expect(220);
    $send("EHLO levalt.tech");          $expect(250);
    $send("AUTH LOGIN");                $expect(334);
    $send(base64_encode($user));        $expect(334);
    $send(base64_encode($pass));        $expect(235);
    $send("MAIL FROM:<$fromEmail>");    $expect(250);
    $send("RCPT TO:<$to>");             $expect(250);
    $send("DATA");                      $expect(354);

    $boundary = 'b_' . bin2hex(random_bytes(8));
    $headers  = "From: " . sprintf('"%s" <%s>', $fromName, $fromEmail) . "\r\n";
    $headers .= "To: <$to>\r\n";
    if ($replyTo) $headers .= "Reply-To: <$replyTo>\r\n";
    $headers .= "Subject: " . $subject . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Date: " . date('r') . "\r\n";
    $body = $html;
    // dot-stuffing
    $body = preg_replace('/^\./m', '..', $body);
    $send($headers . "\r\n" . $body . "\r\n.");
    $expect(250);
    $send("QUIT");
    fclose($fp);
};

function should_reply($email) {
    $domain = strtolower(substr(strrchr($email, '@'), 1));
    $blocked = ['example.com','example.net','example.org','test.com','invalid.com'];
    return $domain && !in_array($domain, $blocked) && !str_ends_with($domain, '.test') && !str_ends_with($domain, '.invalid');
}

try {
    // 1) Admin email (mandatory)
    smtp_send($SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS,
        $FROM_NAME, $SMTP_USER, $ADMIN_TO,
        "New enquiry from $name — $service",
        $adminHtml, $email);

    // 2) Customer auto-reply (optional)
    if (should_reply($email)) {
        try {
            smtp_send($SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS,
                'Levalt.tech', $SMTP_USER, $email,
                'We received your message — Levalt.tech',
                $replyHtml);
        } catch (Exception $e) {
            error_log('Auto-reply failed: ' . $e->getMessage());
        }
    }

    echo json_encode(['ok' => true]);
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send message']);
}
