using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Models
{
    public class TaskType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Icon { get; set; }
        public int ProjectId { get; set; }

        public virtual Project Project { get; set; }
    }
}
