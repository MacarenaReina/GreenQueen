using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace GreenQueen.WebAPI.Models
{
    public class Disco
    {
        [Key]
        public int IdDisco { get; set; }
        public String Titulo { get; set; }
        public float? Agno { get; set; }
        public int IdInterprete { get; set; }

        //[ForeignKey("IdInterprete")]
        //public virtual Interprete Interprete { get; set; }
    }
}