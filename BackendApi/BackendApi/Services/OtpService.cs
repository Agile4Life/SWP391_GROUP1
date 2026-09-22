using System.Collections.Concurrent;

namespace BackendApi.Services
{
    public class OtpEntry
    {
        public string Code { get; set; } = string.Empty;
        public DateTime ExpireAt { get; set; }
        public int FailedAttempts { get; set; } = 0; // Đếm số lần nhập sai
    }

    public enum OtpVerifyResult
    {
        Success,
        NotFoundOrExpired,
        InvalidCode,
        MaxAttemptsExceeded
    }

    public class OtpService
    {
        private static readonly ConcurrentDictionary<string, OtpEntry> _otpStore = new();
        private readonly ILogger<OtpService> _logger;
        private const int MaxAttempts = 3; // Giới hạn tối đa 3 lần thử

        public OtpService(ILogger<OtpService> logger)
        {
            _logger = logger;
        }

        public string GenerateOtp(string targetIdentifier)
        {
            var random = new Random();
            string otpCode = random.Next(100000, 999999).ToString();

            var entry = new OtpEntry
            {
                Code = otpCode,
                ExpireAt = DateTime.UtcNow.AddMinutes(5), // Hết hạn sau 5 phút
                FailedAttempts = 0
            };

            _otpStore[targetIdentifier.ToLower()] = entry;
            _logger.LogInformation($"[MOCK SMS/EMAIL] OTP: {otpCode} tới {targetIdentifier}");

            return otpCode;
        }

        // Kiểm tra OTP kèm logic Expiry và Max Attempts (US03-F04)
        public (OtpVerifyResult Result, int RemainingAttempts) VerifyOtp(string targetIdentifier, string inputCode)
        {
            string key = targetIdentifier.ToLower();

            if (!_otpStore.TryGetValue(key, out var entry))
            {
                return (OtpVerifyResult.NotFoundOrExpired, 0);
            }

            // Kiểm tra thời gian hết hạn
            if (DateTime.UtcNow > entry.ExpireAt)
            {
                _otpStore.TryRemove(key, out _);
                return (OtpVerifyResult.NotFoundOrExpired, 0);
            }

            // Kiểm tra số lần nhập sai
            if (entry.FailedAttempts >= MaxAttempts)
            {
                _otpStore.TryRemove(key, out _); // Hủy mã OTP do sai quá nhiều lần
                return (OtpVerifyResult.MaxAttemptsExceeded, 0);
            }

            // Kiểm tra mã OTP khớp hay không
            if (entry.Code != inputCode)
            {
                entry.FailedAttempts++;
                int remaining = MaxAttempts - entry.FailedAttempts;

                if (remaining <= 0)
                {
                    _otpStore.TryRemove(key, out _);
                    return (OtpVerifyResult.MaxAttemptsExceeded, 0);
                }

                return (OtpVerifyResult.InvalidCode, remaining);
            }

            // Thành công: Xóa OTP để không tái sử dụng
            _otpStore.TryRemove(key, out _);
            return (OtpVerifyResult.Success, 0);
        }
    }
}