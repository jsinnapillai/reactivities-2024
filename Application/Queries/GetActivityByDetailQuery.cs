using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;

namespace Application.Queries
{
    public class GetActivityByDetailQuery : IRequest<Activity>
    {
        public Guid Id { get; set; }
    }
}