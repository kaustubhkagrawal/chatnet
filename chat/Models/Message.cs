using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chat.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string ConnectionId { get; set; }
        public string name { get; set; }
        public string msg { get; set; }
    }
}
