using AngularJs.EndPoint.WebApi.Filters;

public static class DependencyInjections
{
    public static IServiceCollection AddWebApi(this IServiceCollection services,IConfiguration configuration)
    {
        // Add services to the container.
        services.AddControllers();

        // Configure Swagger/OpenAPI
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new Microsoft.OpenApi.OpenApiInfo
            {
                Title = "File Upload API",
                Version = "v1",
                Description = "API for uploading and downloading files"
            });

            // Enable file upload in Swagger UI
            c.OperationFilter<SwaggerFileUploadOperationFilter>();
        });

        // CORS
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                builder => builder.AllowAnyOrigin()
                                  .AllowAnyMethod()
                                  .AllowAnyHeader());
        });

        return services;
    }
}
