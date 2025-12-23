var builder = WebApplication.CreateBuilder(args);

IConfiguration configuration = builder.Configuration;

builder.Services.AddWebApp(configuration);

var app = builder.Build();
app.UseWebApp();
app.Run();
