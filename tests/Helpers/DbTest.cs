using System.Data.Common;
using iconcept.Infrastructure;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Xunit.Abstractions;

namespace iconcept.tests.Helpers;

public class DbTest
{
	//private readonly ShopContext _context;
	private readonly DbContextOptions<ConceptDbContext> _contextOptions;
	private readonly DbConnection _connection;
	private readonly ITestOutputHelper _output;

	public DbTest(ITestOutputHelper output)

	{
		_output = output;

		_contextOptions = new DbContextOptionsBuilder<ConceptDbContext>()
				.UseSqlite(CreateInMemoryDatabase())
				.LogTo(_output.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, Microsoft.Extensions.Logging.LogLevel.Information)
				.EnableSensitiveDataLogging()
				.Options;
		_connection = RelationalOptionsExtension.Extract(_contextOptions).Connection;
	}

	public DbContextOptions<ConceptDbContext> ContextOptions => _contextOptions;


	private static DbConnection CreateInMemoryDatabase()
	{
		var connection = new SqliteConnection("Filename=:memory:");

		connection.Open();

		return connection;
	}

	public void Dispose() => _connection.Dispose();
}