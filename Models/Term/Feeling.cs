using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iconcept.Models.Term
{
    public class Feeling
    {
        public int Id {get; set;}
        public string FeelingName {get; set;}
        public List<ConceptTranslation> ConceptTranslations {get;} = [];
    }
}