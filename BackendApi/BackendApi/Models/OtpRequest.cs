using System.ComponentModel.DataAnnotations;

namespace BackendApi.Models
{
    public class OtpRequest
    {
        // Có thể gửi qua Email hoặc Số điện thoại
        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }
    }
}