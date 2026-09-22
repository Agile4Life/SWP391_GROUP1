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

        private static readonly List<UserModel> MockUsers = new()
        {
            new UserModel { Id = 1, Username = "admin", Password = "123", Role = "Manager", IsActive = true },
            new UserModel { Id = 2, Username = "member1", Password = "123", Role = "Member", IsActive = true },
            new UserModel { Id = 3, Username = "coach1", Password = "123", Role = "Coach", IsActive = true },
            new UserModel { Id = 4, Username = "banned_user", Password = "123", Role = "Member", IsActive = false }
        };

        public AuthController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // 1. Tìm user theo username
            var user = MockUsers.FirstOrDefault(u => u.Username.Equals(request.Username, StringComparison.OrdinalIgnoreCase));

            // Kiểm tra: sai tên đăng nhập hoặc sai mật khẩu
            if (user == null || user.Password != request.Password)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new ErrorResponse(
                    StatusCodes.Status401Unauthorized,
                    "INVALID_CREDENTIALS",
                    "Tên đăng nhập hoặc mật khẩu không chính xác",
                    null
                ));
            }

            // 2. Kiểm tra tài khoản không hợp lệ (bị vô hiệu hóa / khóa)
            if (!user.IsActive)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new ErrorResponse(
                    StatusCodes.Status403Forbidden,
                    "ACCOUNT_LOCKED",
                    "Tài khoản của bạn đã bị khóa hoặc ngừng hoạt động",
                    null
                ));
            }

            // 3. Đăng nhập đúng: sinh token JWT chứa Role
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