using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;

namespace Application.Commands
{
    public class EditActivityCommand : IRequest
    {
        // public Guid Id { get; set; }
        public Activity Activity { get; set; }
        
    }
}