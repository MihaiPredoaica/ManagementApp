using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Models
{
    public class TaskType
    {
        public int Id { get; set; }
        public int Layer { get; set; }
        public string Name { get; set; }
        public string ProjectId { get; set; }

        public virtual Project Project { get; set; }
    }
}
