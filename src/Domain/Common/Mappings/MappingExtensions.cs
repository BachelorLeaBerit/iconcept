using Domain.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace Domain.Common.Mappings;

public static class MappingExtensions
{
    public static Task<PaginatedTranslations<TDestination>> PaginatedTranslationsAsync<TDestination>(this IQueryable<TDestination> queryable, int pageNumber, int pageSize) where TDestination : class
        => PaginatedTranslations<TDestination>.CreateAsync(queryable.AsNoTracking(), pageNumber, pageSize);
}