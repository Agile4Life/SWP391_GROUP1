using BackendApi.Models;
using BackendApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly OtpService _otpService;

        private static readonly List<UserModel> MockUsers = new()
        {
            new UserModel { Id = 1, Username = "admin", Password = "123", Email = "admin@example.com", PhoneNumber = "0901234567", Role = "Manager", IsActive = true, IsVerified = true },
            new UserModel { Id = 2, Username = "member1", Password = "123", Email = "member1@example.com", PhoneNumber = "0912345678", Role = "Member", IsActive = true, IsVerified = true },
            new UserModel { Id = 3, Username = "coach1", Password = "123", Email = "coach1@example.com", PhoneNumber = "0923456789", Role = "Coach", IsActive = true, IsVerified = true },
            new UserModel { Id = 4, Username = "banned_user", Password = "123", Email = "banned@example.com", PhoneNumber = "0934567890", Role = "Member", IsActive = false, IsVerified = true }
        };

        public AuthController(JwtService jwtService, OtpService otpService)
        {
            _jwtService = jwtService;
            _otpService = otpService;
        }

        // ==========================================
        // 1. TICKET [US03-F02]: GỬI OTP
        // ==========================================
        [HttpPost("send-otp")]
        public IActionResult SendOtp([FromBody] OtpRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) && string.IsNullOrWhiteSpace(request.PhoneNumber))
            {
                return BadRequest(new ErrorResponse(
                    StatusCodes.Status400BadRequest,
                    "MISSING_TARGET",
                    "Cần cung cấp ít nhất Email hoặc Số điện thoại để gửi mã OTP",
                    null
                ));
            }

            string target = !string.IsNullOrWhiteSpace(request.Email)
                ? request.Email.Trim()
                : request.PhoneNumber!.Trim();

            string otpCode = _otpService.GenerateOtp(target);

            return Ok(new
            {
                message = "Mã OTP đã được gửi thành công",
                destination = target,
                expiresInMinutes = 5,
                debugOtp = otpCode
            });
        }

        // =========================================================================
        // 2. TICKET [US03-F04] & [US03-F05]: VERIFY OTP VÀ CHUYỂN TRẠNG THÁI TÀI KHOẢN
        // =========================================================================
        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ErrorResponse(
                    StatusCodes.Status400BadRequest,
                    "VALIDATION_ERROR",
                    "Dữ liệu OTP không hợp lệ",
                    ModelState
                ));
            }

            // Gọi service kiểm tra OTP, thời hạn và số lần thử (US03-F04)
            var (result, remainingAttempts) = _otpService.VerifyOtp(request.Target, request.OtpCode);

            switch (result)
            {
                case OtpVerifyResult.NotFoundOrExpired:
                    return BadRequest(new ErrorResponse(
                        StatusCodes.Status400BadRequest,
                        "OTP_EXPIRED_OR_NOT_FOUND",
                        "Mã OTP đã hết hạn hoặc không tồn tại. Vui lòng yêu cầu mã mới",
                        null
                    ));

                case OtpVerifyResult.MaxAttemptsExceeded:
                    return StatusCode(StatusCodes.Status429TooManyRequests, new ErrorResponse(
                        StatusCodes.Status429TooManyRequests,
                        "MAX_ATTEMPTS_EXCEEDED",
                        "Bạn đã nhập sai OTP quá 3 lần. Mã đã bị vô hiệu hóa",
                        null
                    ));

                case OtpVerifyResult.InvalidCode:
                    return BadRequest(new ErrorResponse(
                        StatusCodes.Status400BadRequest,
                        "INVALID_OTP",
                        $"Mã OTP không chính xác. Bạn còn {remainingAttempts} lần thử",
                        new { remainingAttempts }
                    ));

                case OtpVerifyResult.Success:
                    // TICKET [US03-F05]: Chuyển trạng thái tài khoản sang đã kích hoạt/xác thực
                    var user = MockUsers.FirstOrDefault(u =>
                        u.Email.Equals(request.Target.Trim(), StringComparison.OrdinalIgnoreCase) ||
                        u.PhoneNumber.Equals(request.Target.Trim()));

                    if (user != null)
                    {
                        user.IsVerified = true;
                        user.IsActive = true;
                    }

                    return Ok(new
                    {
                        message = "Xác thực OTP thành công. Tài khoản đã được kích hoạt",
                        target = request.Target,
                        accountStatus = "ACTIVE",
                        isVerified = true
                    });

                default:
                    return StatusCode(StatusCodes.Status500InternalServerError, new ErrorResponse(
                        StatusCodes.Status500InternalServerError,
                        "UNKNOWN_ERROR",
                        "Đã xảy ra lỗi không xác định",
                        null
                    ));
            }
        }

        // ==========================================
        // CÁC API CŨ: REGISTER, LOGIN, CHECKS
        // ==========================================
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ErrorResponse(
                    StatusCodes.Status400BadRequest,
                    "VALIDATION_ERROR",
                    "Dữ liệu gửi lên không hợp lệ",
                    ModelState
                ));
            }

            if (MockUsers.Any(u => u.Username.Equals(request.Username, StringComparison.OrdinalIgnoreCase)))
            {
                return Conflict(new ErrorResponse(StatusCodes.Status409Conflict, "USERNAME_ALREADY_EXISTS", "Tên đăng nhập đã tồn tại", null));
            }

            if (MockUsers.Any(u => u.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase)))
            {
                return Conflict(new ErrorResponse(StatusCodes.Status409Conflict, "EMAIL_ALREADY_EXISTS", "Email đã tồn tại", null));
            }

            var newUser = new UserModel
            {
                Id = MockUsers.Count + 1,
                Username = request.Username,
                Password = request.Password,
                Email = request.Email,
                PhoneNumber = "",
                Role = string.IsNullOrWhiteSpace(request.Role) ? "Member" : request.Role,
                IsActive = false, // Tài khoản mới tạo tạm thời chưa active cho đến khi verify OTP
                IsVerified = false
            };

            MockUsers.Add(newUser);

            return StatusCode(StatusCodes.Status201Created, new
            {
                message = "Đăng ký thành công. Vui lòng xác thực OTP để kích hoạt tài khoản",
                userId = newUser.Id,
                username = newUser.Username,
                email = newUser.Email,
                isActive = newUser.IsActive
            });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = MockUsers.FirstOrDefault(u => u.Username.Equals(request.Username, StringComparison.OrdinalIgnoreCase));

            if (user == null || user.Password != request.Password)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new ErrorResponse(
                    StatusCodes.Status401Unauthorized, "INVALID_CREDENTIALS", "Tên đăng nhập hoặc mật khẩu không chính xác", null
                ));
            }

            if (!user.IsActive)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new ErrorResponse(
                    StatusCodes.Status403Forbidden, "ACCOUNT_LOCKED", "Tài khoản của bạn chưa kích hoạt hoặc đã bị khóa", null
                ));
            }

            var token = _jwtService.GenerateToken(user);
            return Ok(new LoginResponse { Token = token, Username = user.Username, Role = user.Role });
        }

        [HttpGet("check-existence")]
        public IActionResult CheckExistence([FromQuery] string? email, [FromQuery] string? phone)
        {
            if (string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(phone))
            {
                return BadRequest(new ErrorResponse(StatusCodes.Status400BadRequest, "MISSING_PARAMETERS", "Vui lòng nhập email hoặc SĐT", null));
            }

            bool isEmailTaken = !string.IsNullOrWhiteSpace(email) && MockUsers.Any(u => u.Email.Equals(email.Trim(), StringComparison.OrdinalIgnoreCase));
            bool isPhoneTaken = !string.IsNullOrWhiteSpace(phone) && MockUsers.Any(u => u.PhoneNumber.Equals(phone.Trim()));

            return Ok(new { emailChecked = email, isEmailTaken, phoneChecked = phone, isPhoneTaken, isAvailable = !isEmailTaken && !isPhoneTaken });
        }

        [HttpGet("account-status")]
        public IActionResult CheckAccountStatus([FromQuery] string identifier)
        {
            if (string.IsNullOrWhiteSpace(identifier))
            {
                return BadRequest(new ErrorResponse(StatusCodes.Status400BadRequest, "MISSING_IDENTIFIER", "Vui lòng nhập định danh tài khoản", null));
            }

            var user = MockUsers.FirstOrDefault(u =>
                u.Username.Equals(identifier.Trim(), StringComparison.OrdinalIgnoreCase) ||
                u.Email.Equals(identifier.Trim(), StringComparison.OrdinalIgnoreCase) ||
                u.PhoneNumber.Equals(identifier.Trim()));

            if (user == null)
            {
                return NotFound(new ErrorResponse(StatusCodes.Status404NotFound, "USER_NOT_FOUND", "Không tìm thấy tài khoản", null));
            }

            return Ok(new { username = user.Username, isActive = user.IsActive, isVerified = user.IsVerified, status = user.IsActive ? "ACTIVE" : "LOCKED" });
        }
    }
}