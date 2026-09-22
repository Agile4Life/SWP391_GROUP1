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

        // Giả lập cơ sở dữ liệu mẫu trong bộ nhớ
        private static readonly List<UserModel> MockUsers = new()
        {
            new UserModel { Id = 1, Username = "admin", Password = "123", Email = "admin@example.com", Role = "Manager", IsActive = true },
            new UserModel { Id = 2, Username = "member1", Password = "123", Email = "member1@example.com", Role = "Member", IsActive = true },
            new UserModel { Id = 3, Username = "coach1", Password = "123", Email = "coach1@example.com", Role = "Coach", IsActive = true },
            new UserModel { Id = 4, Username = "banned_user", Password = "123", Email = "banned@example.com", Role = "Member", IsActive = false }
        };

        public AuthController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        // ==========================================
        // 1. API ĐĂNG KÝ (TICKET US02-F02)
        // ==========================================
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            // Kiểm tra validation dữ liệu đầu vào
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

            // Kiểm tra tài khoản đã tồn tại chưa
            bool isUsernameTaken = MockUsers.Any(u => u.Username.Equals(request.Username, StringComparison.OrdinalIgnoreCase));
            if (isUsernameTaken)
            {
                return Conflict(new ErrorResponse(
                    StatusCodes.Status409Conflict,
                    "USERNAME_ALREADY_EXISTS",
                    "Tên đăng nhập đã tồn tại trong hệ thống",
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
                Role = string.IsNullOrWhiteSpace(request.Role) ? "Member" : request.Role,
                IsActive = true
            };

            MockUsers.Add(newUser);

            // Trả về HTTP 201 Created khi tạo tài khoản thành công
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
        // 2. API ĐĂNG NHẬP (TICKET US01-F03)
        // ==========================================
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Kiểm tra username và password
            var user = MockUsers.FirstOrDefault(u => u.Username.Equals(request.Username, StringComparison.OrdinalIgnoreCase));

            if (user == null || user.Password != request.Password)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new ErrorResponse(
                    StatusCodes.Status401Unauthorized,
                    "INVALID_CREDENTIALS",
                    "Tên đăng nhập hoặc mật khẩu không chính xác",
                    null
                ));
            }

            // Kiểm tra trạng thái tài khoản
            if (!user.IsActive)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new ErrorResponse(
                    StatusCodes.Status403Forbidden,
                    "ACCOUNT_LOCKED",
                    "Tài khoản của bạn đã bị khóa hoặc ngừng hoạt động",
                    null
                ));
            }

            // Sinh chuỗi Token JWT có chứa Role
            var token = _jwtService.GenerateToken(user);

            return Ok(new LoginResponse
            {
                Token = token,
                Username = user.Username,
                Role = user.Role
            });
        }
    }
}