using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace OnboardingTask_ReactDemo.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sale>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }


        [JsonIgnore]
        public virtual ICollection<Sale> Sales { get; set; }
    }
}
