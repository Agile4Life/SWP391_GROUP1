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

        // Dữ liệu người dùng giả lập (Mock Database) phục vụ kiểm thử
        private static readonly List<UserModel> MockUsers = new()
        {
            new UserModel { Id = 1, Username = "admin", Password = "123", Email = "admin@example.com", PhoneNumber = "0901234567", Role = "Manager", IsActive = true },
            new UserModel { Id = 2, Username = "member1", Password = "123", Email = "member1@example.com", PhoneNumber = "0912345678", Role = "Member", IsActive = true },
            new UserModel { Id = 3, Username = "coach1", Password = "123", Email = "coach1@example.com", PhoneNumber = "0923456789", Role = "Coach", IsActive = true },
            new UserModel { Id = 4, Username = "banned_user", Password = "123", Email = "banned@example.com", PhoneNumber = "0934567890", Role = "Member", IsActive = false }
        };

        public AuthController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        // ==========================================
        // 1. TICKET [US02-F02]: ĐĂNG KÝ TÀI KHOẢN
        // ==========================================
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            // Kiểm tra tính hợp lệ dữ liệu đầu vào (Validation)
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
                    );

                return BadRequest(new ErrorResponse(
                    StatusCodes.Status400BadRequest,
                    "VALIDATION_ERROR",
                    "Dữ liệu gửi lên không hợp lệ",
                    errors
                ));
            }

            // Kiểm tra trùng username
            if (MockUsers.Any(u => u.Username.Equals(request.Username, StringComparison.OrdinalIgnoreCase)))
            {
                return Conflict(new ErrorResponse(
                    StatusCodes.Status409Conflict,
                    "USERNAME_ALREADY_EXISTS",
                    "Tên đăng nhập đã tồn tại trong hệ thống",
                    null
                ));
            }

            // Kiểm tra trùng email
            if (MockUsers.Any(u => u.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase)))
            {
                return Conflict(new ErrorResponse(
                    StatusCodes.Status409Conflict,
                    "EMAIL_ALREADY_EXISTS",
                    "Email đã tồn tại trong hệ thống",
                    null
                ));
            }

            // Tạo người dùng mới và lưu vào danh sách
            var newUser = new UserModel
            {
                Id = MockUsers.Count + 1,
                Username = request.Username,
                Password = request.Password,
                Email = request.Email,
                PhoneNumber = "",
                Role = string.IsNullOrWhiteSpace(request.Role) ? "Member" : request.Role,
                IsActive = true
            };

            MockUsers.Add(newUser);

            return StatusCode(StatusCodes.Status201Created, new
            {
                message = "Đăng ký tài khoản thành công",
                userId = newUser.Id,
                username = newUser.Username,
                email = newUser.Email,
                role = newUser.Role
            });
        }

        // ==========================================
        // 2. TICKET [US01-F03]: ĐĂNG NHẬP VÀ TẠO JWT THEO ROLE
        // ==========================================
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Tìm user khớp tên đăng nhập
            var user = MockUsers.FirstOrDefault(u => u.Username.Equals(request.Username, StringComparison.OrdinalIgnoreCase));

            // Kiểm tra sai thông tin đăng nhập
            if (user == null || user.Password != request.Password)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new ErrorResponse(
                    StatusCodes.Status401Unauthorized,
                    "INVALID_CREDENTIALS",
                    "Tên đăng nhập hoặc mật khẩu không chính xác",
                    null
                ));
            }

            // Kiểm tra tài khoản không hợp lệ (bị vô hiệu hóa / khóa)
            if (!user.IsActive)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new ErrorResponse(
                    StatusCodes.Status403Forbidden,
                    "ACCOUNT_LOCKED",
                    "Tài khoản của bạn đã bị khóa hoặc ngừng hoạt động",
                    null
                ));
            }

            // Sinh chuỗi Token JWT chứa Role
            var token = _jwtService.GenerateToken(user);

            return Ok(new LoginResponse
            {
                Token = token,
                Username = user.Username,
                Role = user.Role
            });
        }

        // ==========================================
        // 3. TICKET [US02-F03]: KIỂM TRA TRÙNG EMAIL / SĐT
        // ==========================================
        [HttpGet("check-existence")]
        public IActionResult CheckExistence([FromQuery] string? email, [FromQuery] string? phone)
        {
            if (string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(phone))
            {
                return BadRequest(new ErrorResponse(
                    StatusCodes.Status400BadRequest,
                    "MISSING_PARAMETERS",
                    "Vui lòng cung cấp email hoặc số điện thoại để kiểm tra",
                    null
                ));
            }

            bool isEmailTaken = !string.IsNullOrWhiteSpace(email) &&
                                MockUsers.Any(u => u.Email.Equals(email.Trim(), StringComparison.OrdinalIgnoreCase));

            bool isPhoneTaken = !string.IsNullOrWhiteSpace(phone) &&
                                MockUsers.Any(u => u.PhoneNumber.Equals(phone.Trim()));

            return Ok(new
            {
                emailChecked = email,
                isEmailTaken,
                phoneChecked = phone,
                isPhoneTaken,
                isAvailable = !isEmailTaken && !isPhoneTaken
            });
        }

        // ==========================================
        // 4. TICKET [US02-F03]: KIỂM TRA TRẠNG THÁI TÀI KHOẢN
        // ==========================================
        [HttpGet("account-status")]
        public IActionResult CheckAccountStatus([FromQuery] string identifier)
        {
            if (string.IsNullOrWhiteSpace(identifier))
            {
                return BadRequest(new ErrorResponse(
                    StatusCodes.Status400BadRequest,
                    "MISSING_IDENTIFIER",
                    "Vui lòng nhập username, email hoặc số điện thoại",
                    null
                ));
            }

            var user = MockUsers.FirstOrDefault(u =>
                u.Username.Equals(identifier.Trim(), StringComparison.OrdinalIgnoreCase) ||
                u.Email.Equals(identifier.Trim(), StringComparison.OrdinalIgnoreCase) ||
                u.PhoneNumber.Equals(identifier.Trim()));

            if (user == null)
            {
                return NotFound(new ErrorResponse(
                    StatusCodes.Status404NotFound,
                    "USER_NOT_FOUND",
                    "Không tìm thấy tài khoản trong hệ thống",
                    null
                ));
            }

            return Ok(new
            {
                username = user.Username,
                isActive = user.IsActive,
                status = user.IsActive ? "ACTIVE" : "LOCKED"
            });
        }
    }
}