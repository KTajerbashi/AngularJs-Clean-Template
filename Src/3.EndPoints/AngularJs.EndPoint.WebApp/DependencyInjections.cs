using AngularJs.EndPoint.WebApi.Filters;

public static class DependencyInjections
{
    public static IServiceCollection AddWebApp(this IServiceCollection services,IConfiguration configuration)
    {
        // Add services to the container.
        services.AddRazorPages();
        services.AddWebApi(configuration);
        return services;
    }

    public static void UseWebApp(this WebApplication app)
    {

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "File Upload API V1");
            });
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.UseCors("AllowAll");

        app.MapControllers();

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthorization();

        app.MapStaticAssets();
        app.MapRazorPages()
           .WithStaticAssets();


    }
}
