using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

#nullable disable

namespace OnboardingTask_ReactDemo.Models
{
    public partial class Product
    {


        public Product()
        {
            Sales = new HashSet<Sale>();
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }

        [JsonIgnore]
        public virtual ICollection<Sale> Sales { get; set; }
    }
}
