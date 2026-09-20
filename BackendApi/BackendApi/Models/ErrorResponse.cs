using System;

namespace BackendApi.Models
{
    public class ErrorResponse
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public int Status { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public object? Details { get; set; }

        public ErrorResponse(int status, string code, string message, object? details = null)
        {
            Status = status;
            Code = code;
            Message = message;
            Details = details;
        }
    }
}