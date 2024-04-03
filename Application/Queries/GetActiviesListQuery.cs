using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Responses;
using Domain;
using MediatR;

namespace Application.Queries
{
    public class GetActiviesListQuery :IRequest<List<Activity>>
    {

        
    }
}