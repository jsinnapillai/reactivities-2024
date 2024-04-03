using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace Application.Commands
{
    public class DeleteActivityCommand : IRequest
    {
        public Guid ActivityId { get; set; }
        
    }
}