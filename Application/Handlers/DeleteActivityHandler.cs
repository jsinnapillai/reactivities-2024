using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Commands;
using MediatR;
using Persistence;

namespace Application.Handlers
{
    public class DeleteActivityHandler : IRequestHandler<DeleteActivityCommand>
    {
        private readonly DataContext _dataContext;
        public DeleteActivityHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
            
        }
        public async Task Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
        {
             var activity = await _dataContext.Activities.FindAsync(request.ActivityId);
             _dataContext.Remove(activity);
             await _dataContext.SaveChangesAsync();
        }
    }
}