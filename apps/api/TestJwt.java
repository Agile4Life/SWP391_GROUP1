
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

public class TestJwt {
    public static void main(String[] args) {
        String secret = "c2Ntc19sb2NhbF9qd3Rfc2VjcmV0X2tleV9mb3Jfc3dwMzkxX3Byb2plY3RfMjAyNg==";
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjb2FjaEBzY21zLmxvY2FsIiwidXNlcklkIjoyLCJyb2xlIjoiQ09BQ0giLCJpYXQiOjE3OTEyMDgxMjQsImV4cCI6MTc5MTI5NDUyNH0.HXmhd2-5qgFYkvCl35Df-iKEMo_wiPW5GyvwdnIx2kz92QQHf-tohzvLT1x3mt0p97FPyZ-7Kw1RndCNRZiJBg";
        try {
            Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
            System.out.println("Parsed: " + claims);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

