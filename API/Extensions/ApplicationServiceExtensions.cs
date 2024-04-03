using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Handlers;
using Application.Mappers;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection  AddApplicationServices(this IServiceCollection services, IConfiguration config )
        {
            
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddDbContext<DataContext>(opt => {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });

        services.AddCors( opt => {
            opt.AddPolicy("CorePolicy", policy => {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
            });
        });
 
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetActiviesListHandler).Assembly));
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            
        return services;
        

        
        }
    }
}