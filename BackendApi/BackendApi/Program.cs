using BackendApi.Middlewares;
using BackendApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký JwtService vào hệ thống
builder.Services.AddScoped<JwtService>();

// Đọc danh sách origin từ file appsettings.json
var allowedOrigins = builder.Configuration.GetSection("FrontendOrigins").Get<string[]>() ?? Array.Empty<string>();

// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendCorsPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();

// Cấu hình Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Sử dụng Middleware xử lý lỗi
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Bật Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// Kích hoạt CORS
app.UseCors("FrontendCorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();