using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Models
{
    public class ProjectTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TypeId { get; set; }
        public int ProjectId { get; set; }
        public int ParentTaskId { get; set; }

        public virtual TaskType Type { get; set; }
        public virtual Project Project { get; set; }
    }
}
