using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Queries;
using Domain;
using MediatR;
using Persistence;

namespace Application.Handlers
{
    public class GetActivityByDetailHandler : IRequestHandler<GetActivityByDetailQuery, Activity>
    {
        private readonly DataContext _dataContext;

        public GetActivityByDetailHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<Activity> Handle(GetActivityByDetailQuery request, CancellationToken cancellationToken)
        {
            return await _dataContext.Activities.FindAsync(request.Id);
        }
    }
}