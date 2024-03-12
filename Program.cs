using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using iconcept.Domain.Auth;
using iconcept.Domain.Term;
using iconcept.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddSwaggerGen();

var IsDevelopment = builder.Environment.IsDevelopment();

builder.Configuration.AddEnvironmentVariables().AddJsonFile($"appsettings.{(IsDevelopment ? "Development." : "")}json");

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    // Configure identity options if needed
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<ConceptDbContext>()
.AddDefaultTokenProviders()
.AddUserManager<UserManager<User>>();

builder.Services.AddDbContext<ConceptDbContext>(options =>
    options.UseSqlite($"Data Source={Path.Combine("Infrastructure", "concept.db")}"));

builder.Services.AddScoped<DbContextInitializer>();

builder.Services.AddMediatR(typeof(Program));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using (var scope = app.Services.CreateScope())
    {
        var initializer = scope.ServiceProvider.GetRequiredService<DbContextInitializer>();
        await initializer.SeedAsync();

        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        // Create default roles if they don't exist
        var roles = new List<string> { "Admin", "Editor", "Normal" };
        foreach (var roleName in roles)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }
         var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var adminUser = await userManager.FindByEmailAsync("leamadelen@gmail.com");
        
        if (adminUser != null)
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
    }
}


app.UseCors();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.MapControllers();

app.Run();
