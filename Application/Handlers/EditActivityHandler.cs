using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Commands;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Handlers
{
    public class EditActivityHandler : IRequestHandler<EditActivityCommand>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public EditActivityHandler(DataContext dataContext,IMapper mapper)
        {
            _dataContext = dataContext;
             _mapper = mapper;
        }
        public async Task Handle(EditActivityCommand request, CancellationToken cancellationToken)
        {
            var activity = await _dataContext.Activities.FindAsync(request.Activity.Id);

             _mapper.Map(request.Activity,activity);

            await _dataContext.SaveChangesAsync();
        }
    }
}