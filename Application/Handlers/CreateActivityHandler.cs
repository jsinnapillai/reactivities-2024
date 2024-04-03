using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Commands;
using MediatR;
using Persistence;

namespace Application.Handlers
{
    public class CreateActivityHandler : IRequestHandler<CreateActivityCommand>
    {
                private readonly DataContext _dataContext;
        public CreateActivityHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
            
        }
        public async Task Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
              _dataContext.Activities.Add(request.Activity);
              await _dataContext.SaveChangesAsync();
              
        }
    }
}