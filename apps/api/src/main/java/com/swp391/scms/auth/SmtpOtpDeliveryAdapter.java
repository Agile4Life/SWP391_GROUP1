package com.swp391.scms.auth;

import com.swp391.scms.common.exception.ServiceUnavailableException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "app.auth.otp.delivery", havingValue = "smtp")
public class SmtpOtpDeliveryAdapter implements OtpDeliveryPort {

    private final JavaMailSender mailSender;
    private final String fromAddress;

    public SmtpOtpDeliveryAdapter(JavaMailSender mailSender,
                                  @Value("${app.auth.otp.from-address}") String fromAddress) {
        this.mailSender = mailSender;
        this.fromAddress = fromAddress;
    }

    @Override
    public void send(String destination, String code) {
        if (!destination.contains("@")) {
            throw new ServiceUnavailableException("Chưa cấu hình kênh gửi OTP qua SMS.");
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(destination);
        message.setSubject("Mã xác thực SCMS");
        message.setText("Mã OTP của bạn là " + code + ". Mã hết hạn sau 5 phút.");
        mailSender.send(message);
    }
}
