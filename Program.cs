using Microsoft.EntityFrameworkCore;
using iconcept.Models.User;
using iconcept.Models.Term;
using Microsoft.Extensions.Options;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();


var connection = string.Empty;
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables().AddJsonFile("appsettings.Development.json");
    connection = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
}
else
{
    connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");
}

builder.Services.AddDbContext<ConceptDbContext>(options =>
    options.UseSqlServer(connection));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader()
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
}


app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();


/*
app.MapGet("/User", (ConceptDbContext context) =>
{
    return context.User.ToList();
})
.WithName("GetUser")
.WithOpenApi();
*/

// app.MapPost("/User", (User user, ConceptDbContext context) =>
// {
//     context.Add(user);
//     context.SaveChanges();
// })
// .WithOpenApi();

// app.UseEndpoints(endpoints =>
// {
//     endpoints.MapControllers();
// });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.MapControllers();

app.Run();


public class ConceptDbContext : DbContext
{
    public ConceptDbContext(DbContextOptions<ConceptDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> User { get; set; }
    public DbSet<ConceptTranslation> ConceptTranslations { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<Feeling> Feelings { get; set; }
    public DbSet<Region> Regions { get; set; }
    public DbSet<Religion> Religions { get; set; }
    public DbSet<Term> Terms { get; set; }
}
