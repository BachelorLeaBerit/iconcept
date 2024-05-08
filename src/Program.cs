using Microsoft.EntityFrameworkCore;
using iconcept.Domain.Term;
using Microsoft.Extensions.Options;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using iconcept.Infrastructure;
using iconcept.Domain.Common.Behaviours;
using FluentValidation.AspNetCore;
using System.Reflection;
using MediatR.Extensions.FluentValidation.AspNetCore;
using FluentValidation;
using iconcept.Domain.Auth;
using Algolia.Search.Clients;
using iconcept.Domain.Term.Services;
using System.Text;
using Microsoft.Extensions.WebEncoders;
using System.Text.Encodings.Web;
using System.Text.Unicode;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

builder.Services.AddSwaggerGen();

var IsDevelopment = builder.Environment.IsDevelopment();

var connection = string.Empty;

builder.Configuration.AddEnvironmentVariables().AddJsonFile($"appsettings.{(IsDevelopment ? "Development." : "")}json");
// connection = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");

// else
// {
//     connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");
// }

builder.Services.AddSingleton<ISearchClient>(new SearchClient("P5EELNNK48", "b80b9704fd7a85590c852f88d8983cb8"));
builder.Services.AddScoped<SearchServiceManager>();

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ConceptDbContext>()
    .AddDefaultTokenProviders()
    .AddUserManager<UserManager<User>>();


builder.Services.Configure<IdentityOptions>(opts =>
{
    opts.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzæøåABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ@.0123456789";
});


builder.Services.AddDbContext<ConceptDbContext>(options =>
    options.UseSqlite($"Data Source={Path.Combine("Infrastructure", "concept.db")}"));

builder.Services.AddScoped<DbContextInitializer>();

builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
    cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("https://localhost:44453")
            .AllowAnyOrigin().AllowAnyHeader()
                                                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
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

        var algoliaService = scope.ServiceProvider.GetRequiredService<SearchServiceManager>();
        // await algoliaService.SaveRecordsToAlgoliaAsync();

        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        var roles = new List<string> { "Admin", "Redaktør", "Bruker" };

        foreach (var roleName in roles)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    
        //var adminUser1 = await userManager.FindByEmailAsync("admin@gmail.com");
        //await userManager.RemoveFromRoleAsync(adminUser1, "Bruker");
        //await userManager.AddToRoleAsync(adminUser1, "Admin");
        
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


