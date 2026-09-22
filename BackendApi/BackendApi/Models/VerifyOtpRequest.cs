using System.ComponentModel.DataAnnotations;

namespace BackendApi.Models
{
    public class VerifyOtpRequest
    {
        [Required(ErrorMessage = "Vui lòng cung cấp email hoặc số điện thoại")]
        public string Target { get; set; } = string.Empty; // Email hoặc SĐT đã nhận OTP

        [Required(ErrorMessage = "Mã OTP không được để trống")]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "Mã OTP phải gồm 6 chữ số")]
        public string OtpCode { get; set; } = string.Empty;
    }
}