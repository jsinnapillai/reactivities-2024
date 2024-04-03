using Application.Queries;
using Application.Responses;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers
{
    public class GetActiviesListHandler : IRequestHandler<GetActiviesListQuery, List<Activity>>
    {
        private readonly DataContext _dataContext;
        public GetActiviesListHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
            
        }
        public async Task<List<Activity>> Handle(GetActiviesListQuery request, CancellationToken cancellationToken)
        {
            return await _dataContext.Activities.ToListAsync();
        }
    }
}