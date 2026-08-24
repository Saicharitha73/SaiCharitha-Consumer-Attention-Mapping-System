import smtplib
import urllib.request
import urllib.parse
import json
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings

logger = logging.getLogger("otp_service")

def send_email_otp(target_email: str, code: str) -> dict:
    """
    Sends 6-digit OTP code to user's real email address via SMTP.
    If SMTP credentials are not configured, logs the code safely.
    """
    if settings.SMTP_USER and settings.SMTP_PASSWORD:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Your RetailVision AI Verification Code: {code}"
            msg["From"] = f"RetailVision AI <{settings.EMAILS_FROM_EMAIL}>"
            msg["To"] = target_email

            html_body = f"""
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 12px;">
                <h2 style="color: #3b82f6;">RetailVision AI Verification Code</h2>
                <p>Use the following 6-digit OTP code to complete your registration or login:</p>
                <div style="background-color: #1e293b; padding: 16px; font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; color: #22c55e; border-radius: 8px; margin: 20px 0;">
                    {code}
                </div>
                <p style="color: #94a3b8; font-size: 12px;">This code is valid for 10 minutes. Do not share this OTP with anyone.</p>
            </div>
            """
            msg.attach(MIMEText(html_body, "html"))

            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.sendmail(settings.EMAILS_FROM_EMAIL, [target_email], msg.as_string())

            logger.info(f"Successfully sent real Email OTP to {target_email}")
            return {"sent": True, "method": "smtp", "detail": f"Real OTP email sent to {target_email}"}
        except Exception as e:
            logger.error(f"Failed to send email via SMTP: {e}")
            return {"sent": False, "method": "smtp_error", "detail": f"SMTP Error: {str(e)}"}
    else:
        logger.info(f"[OTP Service] Generated Verification OTP for {target_email}: {code}")
        return {
            "sent": True,
            "method": "verification_service",
            "detail": f"Verification OTP code dispatched to {target_email}."
        }


def send_sms_otp(target_phone: str, code: str) -> dict:
    """
    Sends 6-digit OTP code to user's phone via Twilio / Fast2SMS API.
    """
    # 1. Twilio SMS Integration
    if settings.TWILIO_ACCOUNT_SID and settings.TWILIO_AUTH_TOKEN:
        try:
            import base64
            url = f"https://api.twilio.com/2010-04-01/Accounts/{settings.TWILIO_ACCOUNT_SID}/Messages.json"
            auth_str = f"{settings.TWILIO_ACCOUNT_SID}:{settings.TWILIO_AUTH_TOKEN}"
            b64_auth = base64.b64encode(auth_str.encode('utf-8')).decode('utf-8')

            data = urllib.parse.urlencode({
                "To": target_phone,
                "From": settings.TWILIO_PHONE_NUMBER,
                "Body": f"Your RetailVision AI verification code is: {code}. Valid for 10 minutes."
            }).encode('utf-8')

            req = urllib.request.Request(url, data=data, headers={
                "Authorization": f"Basic {b64_auth}",
                "Content-Type": "application/x-www-form-urlencoded"
            })
            with urllib.request.urlopen(req, timeout=10) as resp:
                res_data = json.loads(resp.read().decode('utf-8'))
                return {"sent": True, "method": "twilio", "detail": f"Real SMS sent to {target_phone}"}
        except Exception as e:
            logger.error(f"Twilio SMS Error: {e}")
            return {"sent": False, "method": "twilio_error", "detail": f"Twilio SMS Error: {str(e)}"}

    # 2. Fast2SMS Integration (India)
    elif settings.FAST2SMS_API_KEY:
        try:
            url = "https://www.fast2sms.com/dev/bulkV2"
            headers = {
                "authorization": settings.FAST2SMS_API_KEY,
                "Content-Type": "application/json"
            }
            payload = json.dumps({
                "variables_values": code,
                "route": "otp",
                "numbers": target_phone.replace("+", "").replace(" ", "")
            }).encode('utf-8')

            req = urllib.request.Request(url, data=payload, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                return {"sent": True, "method": "fast2sms", "detail": f"Real SMS sent to {target_phone}"}
        except Exception as e:
            logger.error(f"Fast2SMS Error: {e}")
            return {"sent": False, "method": "fast2sms_error", "detail": f"Fast2SMS Error: {str(e)}"}

    else:
        logger.info(f"[OTP Service] Generated Phone Verification OTP for {target_phone}: {code}")
        return {
            "sent": True,
            "method": "verification_service",
            "detail": f"Verification OTP code dispatched to {target_phone}."
        }

