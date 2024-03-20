using Microsoft.EntityFrameworkCore;

namespace Domain.Common.Models;

public class PaginatedTranslations<T>
{
    public IReadOnlyCollection<T> Translations { get; }
    public int PageNumber { get; }
    public int TotalPages { get; }
    public int TotalCount { get; }

    public PaginatedTranslations(IReadOnlyCollection<T> translations, int count, int pageNumber, int pageSize)
    {
        PageNumber = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        TotalCount = count;
        Translations = translations;
    }

    public bool HasPreviousPage => PageNumber > 1;

    public bool HasNextPage => PageNumber < TotalPages;

    public static async Task<PaginatedTranslations<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var count = await source.CountAsync();
        var translations = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PaginatedTranslations<T>(translations, count, pageNumber, pageSize);
    }
}