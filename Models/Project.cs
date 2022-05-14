using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementApp.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Icon { get; set; }
        public string OwnerId { get; set; }

        public virtual ApplicationUser Owner { get; set; }
        public virtual ICollection<ProjectUser> Users { get; set; }
    }
}
